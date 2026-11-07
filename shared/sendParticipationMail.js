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

function cleanFields(fields = {}) {
  const clean = {};
  for (const [key, value] of Object.entries(fields)) {
    const text = String(value ?? '').trim();
    if (text) clean[key] = text;
  }
  return clean;
}

function orderedEntries(roleLabel, clean) {
  const rows = [
    ['Date', formatDate()],
    ['Rôle', roleLabel],
  ];
  for (const key of FIELD_ORDER) {
    if (clean[key]) rows.push([key, clean[key]]);
  }
  for (const [key, value] of Object.entries(clean)) {
    if (!FIELD_ORDER.includes(key)) rows.push([key, value]);
  }
  return rows;
}

export function buildMailContent(role, fields = {}) {
  const roleLabel = String(role || 'Participation').trim() || 'Participation';
  const clean = cleanFields(fields);
  const rows = orderedEntries(roleLabel, clean);
  const replyTo = clean['E-mail'] || clean.Email || clean.email || '';

  const text = rows.map(([k, v]) => `${k} : ${v}`).join('\n');
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;color:#1a1714;line-height:1.5">
      <h2 style="margin:0 0 8px;font-size:20px">Nouvelle participation — Stand Fii-Moy Gorée</h2>
      <p style="margin:0 0 16px;color:#5c564f">Formulaire envoyé depuis le site / QR code.</p>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:10px 12px;border:1px solid #e6e1da;background:#f7f4ef;font-weight:700;width:34%;vertical-align:top">${escapeHtml(k)}</td>
            <td style="padding:10px 12px;border:1px solid #e6e1da;vertical-align:top;white-space:pre-wrap">${escapeHtml(v)}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  `;

  return {
    roleLabel,
    replyTo,
    subject: `Fii-Moy Gorée · Stand — ${roleLabel}`,
    text,
    html,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export async function sendParticipationMail(role, fields) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Configuration e-mail manquante (RESEND_API_KEY).');
  }

  const mail = buildMailContent(role, fields);
  const payload = {
    from: 'Fii-Moy Gorée <onboarding@resend.dev>',
    to: [MAIL_TO],
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  };
  if (mail.replyTo) payload.reply_to = mail.replyTo;
  // Avec onboarding@resend.dev, Resend n’accepte souvent que l’e-mail du compte.
  // On met le CC dans le corps si le second envoi n’est pas possible.
  if (MAIL_CC && MAIL_CC !== MAIL_TO) {
    payload.cc = [MAIL_CC];
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    // Si le CC est refusé, retenter sans CC.
    const msg = data?.message || data?.error || 'Envoi e-mail impossible';
    if (payload.cc && /cc|recipient|domain/i.test(String(msg))) {
      delete payload.cc;
      payload.html += `<p style="margin-top:16px;color:#5c564f">Copie prévue aussi pour : ${escapeHtml(MAIL_CC)}</p>`;
      const retry = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        signal: AbortSignal.timeout(15000),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const retryData = await retry.json().catch(() => ({}));
      if (!retry.ok) {
        throw new Error(retryData?.message || retryData?.error || msg);
      }
      return { ok: true, id: retryData.id, mail };
    }
    throw new Error(typeof msg === 'string' ? msg : 'Envoi e-mail impossible');
  }

  return { ok: true, id: data.id, mail };
}
