const TO = 'idrissac635@gmail.com';
const CC = 'coulibalyidrissa672@gmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
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
    res.status(200).json({ ok: true, emailed });
  } catch {
    res.status(400).json({ ok: false });
  }
}
