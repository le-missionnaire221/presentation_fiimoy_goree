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

function getApiKeys() {
  return [process.env.RESEND_API_KEY, process.env.RESEND_API_KEY_2]
    .map((key) => String(key || '').trim())
    .filter(Boolean);
}

function isQuotaError(status, message) {
  const text = String(message || '').toLowerCase();
  return status === 429
    || /quota|rate.?limit|too many|daily_quota|monthly_quota/.test(text);
}

function isRecipientError(message) {
  return /cc|recipient|domain|only send testing|verified/i.test(String(message || ''));
}

function buildPayload(mail, { withCc = true } = {}) {
  const payload = {
    from: 'Fii-Moy Gorée <onboarding@resend.dev>',
    to: [MAIL_TO],
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  };
  if (mail.replyTo) payload.reply_to = mail.replyTo;
  if (withCc && MAIL_CC && MAIL_CC !== MAIL_TO) payload.cc = [MAIL_CC];
  return payload;
}

async function sendWithKey(apiKey, mail) {
  let payload = buildPayload(mail, { withCc: true });

  const post = async (body) => {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    return { response, data };
  };

  let { response, data } = await post(payload);
  if (response.ok) return { ok: true, id: data.id, mail };

  const msg = data?.message || data?.error || 'Envoi e-mail impossible';

  // Sans CC si Resend refuse le destinataire en copie.
  if (payload.cc && isRecipientError(msg)) {
    payload = buildPayload(mail, { withCc: false });
    payload.html += `<p style="margin-top:16px;color:#5c564f">Copie prévue aussi pour : ${escapeHtml(MAIL_CC)}</p>`;
    ({ response, data } = await post(payload));
    if (response.ok) return { ok: true, id: data.id, mail };
  }

  const finalMsg = data?.message || data?.error || msg;
  const error = new Error(typeof finalMsg === 'string' ? finalMsg : 'Envoi e-mail impossible');
  error.status = response.status;
  error.quota = isQuotaError(response.status, finalMsg);
  throw error;
}

export async function sendParticipationMail(role, fields) {
  const keys = getApiKeys();
  if (!keys.length) {
    throw new Error('Configuration e-mail manquante (RESEND_API_KEY).');
  }

  const mail = buildMailContent(role, fields);
  let lastError;

  for (let i = 0; i < keys.length; i += 1) {
    try {
      const result = await sendWithKey(keys[i], mail);
      return { ...result, via: i === 0 ? 'primary' : 'backup' };
    } catch (err) {
      lastError = err;
      const hasNext = i < keys.length - 1;
      // Passe au compte suivant si quota dépassé, ou en dernier recours pour tout échec.
      if (hasNext && (err.quota || i === 0)) continue;
      throw err;
    }
  }

  throw lastError || new Error('Envoi e-mail impossible');
}
