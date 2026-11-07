export const MAIL_TO = 'idrissac635@gmail.com';
export const MAIL_CC = 'coulibalyidrissa672@gmail.com';

const FIELD_ORDER = [
  'Nom',
  'E-mail',
  'Téléphone',
  'Type',
  'Organisation',
  'Financement',
  'Proposition',
  'Idée',
  'Message',
];

function formatDate() {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Dakar',
  }).format(new Date());
}

export function buildMailPayload(role, fields = {}) {
  const roleLabel = String(role || 'Participation').trim() || 'Participation';
  const clean = {};
  for (const [key, value] of Object.entries(fields)) {
    const text = String(value ?? '').trim();
    if (text) clean[key] = text;
  }

  const ordered = {
    Date: formatDate(),
    Rôle: roleLabel,
  };
  for (const key of FIELD_ORDER) {
    if (clean[key]) ordered[key] = clean[key];
  }
  for (const [key, value] of Object.entries(clean)) {
    if (!(key in ordered)) ordered[key] = value;
  }

  const replyTo = clean['E-mail'] || clean.Email || clean.email || '';

  return {
    _subject: `Fii-Moy Gorée · Stand — ${roleLabel}`,
    _template: 'table',
    _captcha: 'false',
    _cc: MAIL_CC,
    ...(replyTo ? { _replyto: replyTo, email: replyTo } : {}),
    ...ordered,
  };
}

export async function sendParticipationMail(role, fields) {
  const payload = buildMailPayload(role, fields);
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(MAIL_TO)}`, {
    method: 'POST',
    signal: AbortSignal.timeout(12000),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || data.success === 'false' || data.error) {
    const message = data.message || data.error || 'Envoi e-mail impossible';
    throw new Error(message);
  }

  return { ok: true, payload };
}
