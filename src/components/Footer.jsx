export default function Footer() {
  return (
    <footer className="fm-footer-ultra" id="contact">
      <div className="fm-footer-ultra-grid-pattern" />
      <div className="container">
        <div className="fm-footer-ultra-cta">
          <div className="cta-glow-bg" />
          <div className="cta-content">
            <span className="cta-badge">Patrimoine mondial UNESCO</span>
            <h2>Prêt à marcher <span>sur Gorée ?</span></h2>
            <p>Lieux, récits audio et guides agréés. L'île dans la poche, à votre rythme.</p>
            <div className="cta-buttons">
              <a href="#application" className="btn-ultra-primary">Découvrir l'application</a>
              <a href="#experience" className="btn-ultra-secondary">Voir l'expérience</a>
            </div>
          </div>
          <div className="cta-floating-element shape-1" />
          <div className="cta-floating-element shape-2" />
        </div>
      </div>

      <div className="container fm-footer-ultra-main">
        <div className="footer-grid">
          <div>
            <img src="/logo/app_logo.jpg" alt="" className="footer-logo" />
            <p className="footer-description">
              Fii-Moy Gorée valorise la mémoire et le patrimoine de l'île : cartes, photos, récits et accompagnement par des guides agréés.
            </p>
            <p className="footer-place">Île de Gorée · Dakar · Sénégal</p>
          </div>
          <div>
            <h4>Découvrir</h4>
            <ul>
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#experience">L'expérience</a></li>
              <li><a href="#parcours">Le parcours</a></li>
              <li><a href="#application">L'application</a></li>
            </ul>
          </div>
          <div>
            <h4>Sur l'île</h4>
            <ul>
              <li><a href="#experience">Lieux & mémoire</a></li>
              <li><a href="#parcours">Guides agréés</a></li>
              <li><a href="#application">Carte interactive</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>
                <a href="mailto:idrissac635@gmail.com">idrissac635@gmail.com</a>
              </li>
              <li>
                <a href="tel:+221787442021">+221 78 744 20 21</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="fm-footer-ultra-bottom">
        <div className="container bottom-bar-content">
          <p>© {new Date().getFullYear()} Fii-Moy Gorée · République du Sénégal</p>
          <span className="trust-badge">Patrimoine mondial UNESCO</span>
        </div>
      </div>
    </footer>
  );
}
