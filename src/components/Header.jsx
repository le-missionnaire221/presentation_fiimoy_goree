import { useEffect, useState } from 'react';
import { isParticipateHash } from '../pages/Participate.jsx';

const LINKS = [
  ['#accueil', 'Accueil'],
  ['#experience', "L'expérience"],
  ['#parcours', 'Parcours'],
  ['#application', "L'application"],
  ['#participer', 'Participer'],
  ['#contact', 'Contact'],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash || '#accueil');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onHash = () => setHash(window.location.hash || '#accueil');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (href) => {
    setHash(href);
    setOpen(false);
  };

  return (
    <>
      <header className={`fm-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#accueil" className="fm-logo" onClick={() => go('#accueil')}>
          <img src="/logo/app_logo.jpg" alt="" />
          <span>Fii-Moy <em>Gorée</em></span>
        </a>
        <ul className="fm-nav fm-nav-desktop">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} className={(href === '#participer' ? isParticipateHash(hash) : hash === href) ? 'active' : ''} onClick={() => go(href)}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="fm-header-actions">
          <a href="#parcours" className="fm-btn fm-btn-marketplace">Explorer l'île</a>
          <a href="#application" className="fm-btn fm-btn-primary">Voir l'app</a>
        </div>
        <button className="mobile-toggle" aria-label="Menu" onClick={() => setOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </header>

      <div className={`fm-mobile-overlay ${open ? 'active' : ''}`} onClick={() => setOpen(false)} />
      <nav className={`fm-mobile-drawer ${open ? 'open' : ''}`}>
        <div className="fm-mobile-drawer-header">
          <strong>Fii-Moy Gorée</strong>
          <button className="fm-mobile-drawer-close" onClick={() => setOpen(false)} aria-label="Fermer">×</button>
        </div>
        <ul className="fm-mobile-drawer-links">
          {LINKS.map(([href, label]) => (
            <li key={href}><a href={href} className={(href === '#participer' ? isParticipateHash(hash) : hash === href) ? 'active' : ''} onClick={() => go(href)}>{label}</a></li>
          ))}
        </ul>
        <div className="fm-mobile-drawer-cta">
          <a href="#application" className="fm-btn fm-btn-primary" onClick={() => setOpen(false)}>Voir l'application</a>
        </div>
      </nav>
    </>
  );
}
