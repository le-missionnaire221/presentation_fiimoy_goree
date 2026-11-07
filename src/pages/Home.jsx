import { useState } from 'react';
import Phone from '../components/Phone.jsx';
import {
  ScreenExplore,
  ScreenGuides,
  ScreenHome,
  ScreenMemory,
  ScreenParcours,
  ScreenPlace,
} from '../components/screens.jsx';

const FEATURES = [
  {
    title: 'L’île en images',
    desc: 'Parcourez les lieux de Gorée par zone : le port, les demeures, le Castel. Photos, catégories et carte, comme dans l’application.',
    icon: '◎',
    Screen: ScreenExplore,
  },
  {
    title: 'La mémoire à écouter',
    desc: 'Récits audio et textes liés aux lieux. Appuyez sur lecture et avancez d’une histoire à l’autre, à votre rythme.',
    icon: '♫',
    Screen: ScreenMemory,
  },
  {
    title: 'Un guide de l’île',
    desc: 'Choisissez un guide agréé, consultez ses langues et réservez une visite accompagnée sur place.',
    icon: '👤',
    Screen: ScreenGuides,
  },
  {
    title: 'Un parcours clair',
    desc: 'La visite guidée de l’île, ou l’exploration libre. L’application vous mène d’un lieu à l’autre.',
    icon: '↝',
    Screen: ScreenParcours,
  },
];

const COLS = [
  [ScreenHome, ScreenExplore, ScreenPlace, ScreenMemory],
  [ScreenGuides, ScreenParcours, ScreenHome, ScreenExplore],
  [ScreenMemory, ScreenPlace, ScreenGuides, ScreenParcours],
  [ScreenExplore, ScreenHome, ScreenParcours, ScreenPlace],
];

export default function Home() {
  const [feature, setFeature] = useState(0);
  const Active = FEATURES[feature].Screen;

  return (
    <>
      <section className="fm-hero" id="accueil">
        <div className="fm-hero-glow-1" />
        <div className="fm-hero-glow-2" />
        <div className="container hero-grid">
          <div className="fm-hero-text">
            <div className="fm-badge">Nouveau · Carte, audio et guides agréés</div>
            <h1>
              Découvrez Gorée<br />
              <span>en toute mémoire.</span>
            </h1>
            <p>
              Fii-Moy Gorée ouvre l’île : lieux, récits et parcours. Visitez à votre rythme,
              ou avec un guide agréé. Le patrimoine mondial, dans la poche.
            </p>
            <div className="fm-hero-actions">
              <a href="#application" className="fm-btn fm-btn-primary">Voir l’application</a>
              <a href="#experience" className="fm-btn fm-btn-secondary">Comment ça marche</a>
            </div>
            <div className="fm-trust-block">
              <div className="fm-flag" aria-hidden="true"><i /><i /><i /></div>
              <div className="fm-trust-text">
                <div className="stars">★★★★★</div>
                <p>Île de Gorée · Patrimoine mondial UNESCO</p>
              </div>
            </div>
          </div>

          <div className="fm-hero-mockups">
            <div className="fm-mockup-back-left">
              <Phone><ScreenMemory /></Phone>
            </div>
            <div className="fm-mockup-back-right">
              <Phone><ScreenExplore /></Phone>
            </div>
            <div className="fm-mockup-front">
              <Phone><ScreenHome /></Phone>
            </div>
          </div>
        </div>
      </section>

      <section className="fm-showcase-section" id="experience">
        <div className="container">
          <div className="fm-showcase-title">
            <h2>L’expérience Gorée <span>réinventée</span></h2>
            <p>Une application pensée pour voir, écouter et marcher l’île, simplement.</p>
          </div>
          <div className="fm-showcase-container">
            <div className="fm-showcase-left">
              {FEATURES.map((feat, idx) => (
                <button
                  key={feat.title}
                  type="button"
                  className={`fm-showcase-item ${idx === feature ? 'active' : ''}`}
                  onMouseEnter={() => setFeature(idx)}
                  onFocus={() => setFeature(idx)}
                  onClick={() => setFeature(idx)}
                >
                  <div className="fm-showcase-icon">{feat.icon}</div>
                  <div className="fm-showcase-text">
                    <h3>{feat.title}</h3>
                    <p>{feat.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="fm-showcase-right">
              <div className="fm-showcase-mockup-wrapper">
                <div className="fm-showcase-ring" />
                <div className="fm-showcase-glow" />
                <div key={feature} className="showcase-phone animate-in">
                  <Phone><Active /></Phone>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fm-steps-section" id="parcours">
        <div className="fm-steps-connector" />
        <div className="container">
          <div className="fm-steps-header">
            <h2>Visitez en <span>3 étapes</span></h2>
            <p>De l’accueil de l’application jusqu’au guide, sur le terrain.</p>
          </div>

          <Step
            num="01"
            badge="Explorer"
            title="Choisissez un lieu"
            text="Ouvrez la mosaïque de Gorée. Filtrez par zone, ouvrez une fiche, regardez les photos."
            Screen={ScreenExplore}
          />
          <Step
            num="02"
            badge="Écouter"
            title="Lancez un récit"
            text="Chaque lieu porte une mémoire. Écoutez le récit audio avant ou pendant la marche."
            Screen={ScreenMemory}
            reverse
            tone="gold"
          />
          <Step
            num="03"
            badge="Accompagner"
            title="Partez avec un guide"
            text="Ou suivez le parcours de l’île seul. Le guide agréé vous attend si vous voulez être accompagné."
            Screen={ScreenGuides}
            tone="green"
          />
        </div>
      </section>

      <section className="fm-stage-section">
        <div className="fm-stage-glow" />
        <div className="container">
          <div className="fm-stage-header">
            <div className="fm-stage-badge">Sur l’île</div>
            <h2>L’application<br />dans la poche.</h2>
            <p>Accueil, exploration, mémoire, guides et parcours. Le même design que sur le téléphone.</p>
          </div>
          <div className="fm-stage-mockups">
            <div className="fm-stage-img-wrapper fm-stage-far-left"><Phone><ScreenPlace /></Phone></div>
            <div className="fm-stage-img-wrapper fm-stage-left"><Phone><ScreenMemory /></Phone></div>
            <div className="fm-stage-img-wrapper fm-stage-center"><Phone><ScreenHome /></Phone></div>
            <div className="fm-stage-img-wrapper fm-stage-right"><Phone><ScreenExplore /></Phone></div>
            <div className="fm-stage-img-wrapper fm-stage-far-right"><Phone><ScreenParcours /></Phone></div>
          </div>
          <div className="fm-stage-cta" id="application">
            <div className="fm-gallery-header">
              <div className="fm-gallery-badge">Galerie</div>
              <h2>L’application <span>mobile</span></h2>
              <p>Les écrans de Fii-Moy Gorée, tels qu’ils apparaissent dans l’app.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fm-gallery-section">
        <div className="fm-gallery-container">
          <div className="fm-gallery-grid">
            {COLS.map((col, i) => (
              <div key={i} className={`fm-gallery-col ${i % 2 ? 'down' : 'up'} speed-${i + 1}`}>
                {[...col, ...col].map((Screen, j) => (
                  <div className="fm-gallery-item" key={`${i}-${j}`}>
                    <div className="gallery-screen"><Screen /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ num, badge, title, text, Screen, reverse, tone }) {
  return (
    <div className={`fm-step-row ${reverse ? 'reverse' : ''}`}>
      <div className="fm-step-content">
        <div className="fm-step-massive-num">{num}</div>
        <div className="fm-step-content-inner">
          <div className={`fm-step-badge ${tone || ''}`}>{badge}</div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      <div className="fm-step-visual">
        <div className={`fm-step-blob ${tone || ''}`} />
        <div className="fm-step-image-wrapper">
          <Phone><Screen /></Phone>
        </div>
      </div>
    </div>
  );
}
