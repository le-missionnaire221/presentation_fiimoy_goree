import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export const ROLES = [
  {
    id: 'investisseur',
    title: 'Investisseur',
    text: 'Financer le projet.',
    action: 'Investir',
  },
  {
    id: 'collaborateur',
    title: 'Collaborateur',
    text: 'Entreprise, institution, guide ou école.',
    action: 'Collaborer',
  },
  {
    id: 'contributeur',
    title: 'Contributeur',
    text: 'Partager ses idées pour l’application.',
    action: 'Contribuer',
  },
];

const COLLAB_TYPES = ['Entreprise', 'Institution', 'Guide', 'École'];

export function roleFromHash(hash = window.location.hash) {
  const id = hash.slice(1);
  return ROLES.some((role) => role.id === id) ? id : null;
}

export function isParticipateHash(hash) {
  return hash === '#participer' || roleFromHash(hash) !== null;
}

const PUBLIC_SITE = (import.meta.env.VITE_SITE_URL || 'https://presentation-fiimoygoree.vercel.app').replace(/\/$/, '');

function participateUrl() {
  const host = window.location.hostname;
  const local = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
  // Sur le stand / en ligne : toujours le lien public, pour que le téléphone ouvre le vrai site.
  if (!local) return `${PUBLIC_SITE}/#participer`;
  return `${window.location.origin}${window.location.pathname}#participer`;
}

export function JoinStand() {
  const [src, setSrc] = useState('');
  const [qrHref, setQrHref] = useState('');
  const local = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  useEffect(() => {
    let alive = true;
    const href = participateUrl();
    setQrHref(href);
    QRCode.toDataURL(href, {
      margin: 1,
      width: 240,
      color: { dark: '#1A1714', light: '#FFFFFF' },
    }).then((url) => {
      if (alive) setSrc(url);
    });
    return () => { alive = false; };
  }, []);

  return (
    <section className="join-stand" id="rejoindre">
      <div className="container join-stand-grid">
        <div>
          <p className="join-kicker">Au stand</p>
          <h2>Rejoindre <span>le projet</span></h2>
          <p className="join-lead">
            Scannez le QR code. Chaque visiteur choisit comment participer, puis remplit un formulaire.
            La réponse arrive organisée par e-mail.
          </p>
          <div className="join-roles">
            {ROLES.map((role) => (
              <a key={role.id} href={`#${role.id}`} className="join-role">
                <span className="join-role-copy">
                  <strong>{role.title}</strong>
                  <span className="join-role-text">{role.text}</span>
                </span>
                <span className="join-go">{role.action}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="join-qr">
          {src ? <img src={src} alt="QR code pour rejoindre le projet" /> : <div className="join-qr-box" />}
          <p>Scannez pour participer</p>
          {qrHref && !local && (
            <p className="join-qr-link"><a href={qrHref}>{qrHref.replace(/^https?:\/\//, '')}</a></p>
          )}
          {local && (
            <p className="join-warn">
              En local, utilisez l’IP du PC (pas localhost) pour tester le QR sur un téléphone.
              En production, le QR ouvre automatiquement le site Vercel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

async function sendParticipation(roleLabel, fields) {
  const res = await fetch('/api/participer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: roleLabel, fields }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok || data.emailed === false) {
    throw new Error(data.error || 'Envoi impossible. Réessayez dans un instant.');
  }
}

function Field({ label, name, type = 'text', required, children }) {
  return (
    <label className="join-field">
      <span>{label}{required ? ' *' : ''}</span>
      {children || <input name={name} type={type} required={required} />}
    </label>
  );
}

function RoleForm({ role, onBack, onDone }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = Object.fromEntries([...data.entries()].filter(([, value]) => String(value).trim()));
    setSending(true);
    setError('');
    try {
      await sendParticipation(role.title, fields);
      onDone();
    } catch (err) {
      setError(err.message || 'L’envoi n’a pas abouti. Réessayez.');
      setSending(false);
    }
  };

  return (
    <form className="join-form" onSubmit={submit}>
      <button type="button" className="join-back" onClick={onBack}>← Autre rôle</button>
      <h2>{role.title}</h2>
      <p>{role.text}</p>
      <Field label="Nom" name="Nom" required />
      <Field label="E-mail" name="E-mail" type="email" required />
      {role.id !== 'contributeur' && <Field label="Téléphone" name="Téléphone" type="tel" />}
      {role.id === 'collaborateur' && (
        <Field label="Type" name="Type" required>
          <select name="Type" required defaultValue="">
            <option value="" disabled>Choisir</option>
            {COLLAB_TYPES.map((type) => <option key={type}>{type}</option>)}
          </select>
        </Field>
      )}
      {role.id !== 'contributeur' && <Field label="Organisation" name="Organisation" />}
      {role.id === 'investisseur' && (
        <Field label="Comment souhaitez-vous financer ?" name="Financement" />
      )}
      {role.id === 'investisseur' && (
        <label className="join-field">
          <span>Message</span>
          <textarea name="Message" rows="4" />
        </label>
      )}
      {role.id === 'collaborateur' && (
        <label className="join-field">
          <span>Ce que vous proposez *</span>
          <textarea name="Proposition" rows="4" required />
        </label>
      )}
      {role.id === 'contributeur' && (
        <label className="join-field">
          <span>Votre idée pour l’application *</span>
          <textarea name="Idée" rows="5" required />
        </label>
      )}
      {error && <p className="join-error">{error}</p>}
      <button className="fm-btn fm-btn-primary" type="submit" disabled={sending}>
        {sending ? 'Envoi…' : 'Envoyer'}
      </button>
    </form>
  );
}

export default function Participate() {
  const [roleId, setRoleId] = useState(() => roleFromHash());
  const [done, setDone] = useState(false);
  const role = ROLES.find((item) => item.id === roleId);

  useEffect(() => {
    const sync = () => {
      setRoleId(roleFromHash());
      setDone(false);
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  if (done) {
    return (
      <section className="join-page">
        <div className="container join-done">
          <p className="join-kicker">Merci</p>
          <h2>Votre réponse est enregistrée.</h2>
          <p>Merci. Un e-mail organisé a été envoyé à l’équipe Fii-Moy Gorée.</p>
          <button
            type="button"
            className="fm-btn fm-btn-primary"
            onClick={() => { window.location.hash = 'participer'; }}
          >
            Remplir un autre formulaire
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="join-page">
      <div className="container">
        {!role && (
          <>
            <p className="join-kicker">Rejoindre le projet</p>
            <h2>Comment voulez-vous <span>participer ?</span></h2>
            <div className="join-choices">
              {ROLES.map((item) => (
                <button key={item.id} type="button" className="join-choice" onClick={() => { window.location.hash = item.id; }}>
                  <span className="join-role-copy">
                    <strong>{item.title}</strong>
                    <span className="join-role-text">{item.text}</span>
                  </span>
                  <span className="join-go">{item.action}</span>
                </button>
              ))}
            </div>
          </>
        )}
        {role && (
          <RoleForm
            key={role.id}
            role={role}
            onBack={() => { window.location.hash = 'participer'; }}
            onDone={() => setDone(true)}
          />
        )}
      </div>
    </section>
  );
}
