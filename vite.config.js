import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const TO = 'idrissac635@gmail.com';
const CC = 'coulibalyidrissa672@gmail.com';

function participerApi() {
  return {
    name: 'participer-api',
    configureServer(server) {
      server.middlewares.use('/api/participer', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('POST only');
          return;
        }
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
            const dir = path.resolve('data');
            fs.mkdirSync(dir, { recursive: true });
            fs.appendFileSync(
              path.join(dir, 'participations.jsonl'),
              `${JSON.stringify({ date: new Date().toISOString(), ...body })}\n`,
              'utf8',
            );
            let emailed = false;
            try {
              const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO)}`, {
                method: 'POST',
                signal: AbortSignal.timeout(8000),
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                  _subject: `Stand Fii-Moy Gorée — ${body.role || 'Participation'}`,
                  _cc: CC,
                  _captcha: 'false',
                  _template: 'table',
                  ...(body.fields || {}),
                  Rôle: body.role,
                }),
              });
              emailed = response.ok;
            } catch {
              emailed = false;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, emailed }));
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), participerApi()],
  server: { port: 5180, host: true },
});
