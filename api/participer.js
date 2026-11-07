import { sendParticipationMail } from '../shared/sendParticipationMail.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'POST only' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const role = body.role;
    const fields = body.fields || {};

    if (!role || typeof fields !== 'object') {
      res.status(400).json({ ok: false, error: 'Données invalides' });
      return;
    }

    await sendParticipationMail(role, fields);
    res.status(200).json({ ok: true, emailed: true });
  } catch (err) {
    res.status(502).json({
      ok: false,
      emailed: false,
      error: err?.message || 'Envoi impossible',
    });
  }
}
