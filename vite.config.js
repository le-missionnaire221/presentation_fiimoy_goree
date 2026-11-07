import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sendParticipationMail } from './shared/sendParticipationMail.js';

function participerApi() {
  return {
    name: 'participer-api',
    configureServer(server) {
      server.middlewares.use('/api/participer', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'POST only' }));
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
            await sendParticipationMail(body.role, body.fields || {});
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, emailed: true }));
          } catch (err) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              ok: false,
              emailed: false,
              error: err?.message || 'Envoi impossible',
            }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY;
  if (env.RESEND_API_KEY_2) process.env.RESEND_API_KEY_2 = env.RESEND_API_KEY_2;

  return {
    plugins: [react(), participerApi()],
    server: { port: 5180, host: true },
  };
});
