const EMBARCADERE = '/photos/embarcadere.jpg';
const MAISON = '/photos/maison.jpg';
const CASTEL = '/photos/castel.jpg';
const JOJ = '/photos/joj.jpg';
const VUE = '/photos/goree_vue_aerienne.png';
const ENTREE = '/photos/entree_pierre.png';
const PORTRAIT = '/photos/portrait_archeo.png';
const DSC = '/photos/dsc01269.jpg';

function Dock({ active = 0 }) {
  const items = ['⌂', '◎', '👥', '👤'];
  return (
    <div className="as-dock">
      {items.map((ic, i) => (
        <span key={ic} className={i === active ? 'on' : ''}>{ic}</span>
      ))}
    </div>
  );
}

function Shell({ children, active = 0 }) {
  return (
    <div className="as">
      <div className="as-body">{children}</div>
      <Dock active={active} />
    </div>
  );
}

function Listen({ title, meta, img }) {
  return (
    <div className="as-listen">
      <img src={img} alt="" />
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <b>▶</b>
    </div>
  );
}

export function ScreenHome() {
  const near = [
    ['Maison des Esclaves', 'Mémoire · 4 min', MAISON],
    ['Le Castel', 'Panorama · 3 min', CASTEL],
    ['Embarcadère', 'Arrivée · 2 min', EMBARCADERE],
    ['Fort d’Estrées', 'Musée · 5 min', ENTREE],
    ['La Batterie', 'Patrimoine · 3 min', DSC],
  ];
  return (
    <Shell active={0}>
      <p className="as-kicker">Bienvenue à Gorée</p>
      <h3>Na nga def ?</h3>
      <div className="as-search">Un lieu, une histoire, un guide...</div>
      <p className="as-h">À la une</p>
      <div className="as-hero" style={{ backgroundImage: `url(${JOJ})`, backgroundPosition: 'center 58%' }}>
        <span>ÉVÉNEMENT</span>
        <strong>JOJ Dakar 2026</strong>
        <em>31 oct. – 13 nov.</em>
      </div>
      <p className="as-h">En un geste</p>
      <div className="as-row">
        {[
          ['🎧', 'Mémoire'],
          ['↝', 'Parcours'],
          ['📍', 'Carte'],
          ['♡', 'Favoris'],
        ].map(([ic, lb]) => (
          <div key={lb} className="as-chip">
            <i>{ic}</i>
            {lb}
          </div>
        ))}
      </div>
      <p className="as-h">À découvrir</p>
      {near.map(([title, meta, img]) => (
        <Listen key={title} title={title} meta={meta} img={img} />
      ))}
    </Shell>
  );
}

export function ScreenExplore() {
  const tiles = [
    [VUE, 'Ancien Palais', '216'],
    [MAISON, 'Maison des Esclaves', '150'],
    [CASTEL, 'Le Castel', '170'],
    [EMBARCADERE, 'Batterie', '200'],
    [ENTREE, 'Fort d’Estrées', '180'],
    [DSC, 'Église Saint-Charles', '160'],
    [PORTRAIT, 'Plage de Gorée', '190'],
    [JOJ, 'Rue des Artisans', '150'],
  ];
  return (
    <Shell active={1}>
      <p className="as-kicker">L'île en images</p>
      <h3>Explorer Gorée</h3>
      <div className="as-pills">
        <b>Tout</b>
        <span>Zone Nord</span>
        <span>Mémoire</span>
      </div>
      <div className="as-mosaic">
        {tiles.map(([src, title, h]) => (
          <div key={title}>
            <img src={src} alt="" style={{ height: `${h / 3.2}px` }} />
            <strong>{title}</strong>
            <small>● Patrimoine</small>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function ScreenMemory() {
  const items = [
    ['L’art du sable', 'Audio · 4 min', DSC],
    ['La Maison des Esclaves', 'Récit · 6 min', MAISON],
    ['Le Castel, 1940', 'Audio · 3 min', CASTEL],
    ['Les signares', 'Texte · 6 min', PORTRAIT],
    ['Les chants de l’île', 'Audio · 3 min', EMBARCADERE],
    ['La traversée', 'Récit · 8 min', VUE],
    ['Les façades colorées', 'Audio · 4 min', ENTREE],
  ];
  return (
    <Shell active={0}>
      <p className="as-kicker">Patrimoine vivant</p>
      <h3>À écouter</h3>
      {items.map(([t, s, img]) => (
        <Listen key={t} title={t} meta={s} img={img} />
      ))}
    </Shell>
  );
}

export function ScreenGuides() {
  const guides = [
    ['Awa Ndiaye', 'Histoire'],
    ['Mamadou Diop', 'Mémoire'],
    ['Fatou Sarr', 'Architecture'],
    ['Amadou Diop', 'Patrimoine'],
    ['Moussa Sow', 'Traditions'],
    ['Awa Fall', 'Familles'],
  ];
  return (
    <Shell active={2}>
      <p className="as-kicker">Accompagnement</p>
      <h3>Choisir un guide</h3>
      {guides.map(([name, spec]) => (
        <div className="as-guide" key={name}>
          <i>{name[0]}</i>
          <div>
            <strong>{name}</strong>
            <small>{spec} · FR · WO</small>
          </div>
          <em>Agréé</em>
        </div>
      ))}
    </Shell>
  );
}

export function ScreenParcours() {
  const steps = [
    ['Maison des Esclaves', 'Étape 1 · Mémoire', MAISON],
    ['Église Saint-Charles', 'Étape 2 · Culture', ENTREE],
    ['Musée historique', 'Étape 3 · Fort d’Estrées', PORTRAIT],
    ['Le Castel', 'Étape 4 · Panorama', CASTEL],
    ['La Batterie', 'Étape 5 · Patrimoine', DSC],
    ['Embarcadère', 'Étape 6 · Retour', EMBARCADERE],
  ];
  return (
    <Shell active={0}>
      <p className="as-kicker">Recommandé</p>
      <div className="as-hero tall" style={{ backgroundImage: `url(${VUE})` }}>
        <span>PARCOURS</span>
        <strong>Visite guidée de Gorée</strong>
        <em>6 étapes · à ton rythme</em>
      </div>
      <div className="as-modes">
        <div>
          <b>Guide</b>
          <small>Sur place</small>
        </div>
        <div>
          <b>Libre</b>
          <small>La carte</small>
        </div>
      </div>
      {steps.map(([title, meta, img]) => (
        <Listen key={title} title={title} meta={meta} img={img} />
      ))}
    </Shell>
  );
}

export function ScreenPlace() {
  const photos = [
    [CASTEL, 'La cour', '170'],
    [ENTREE, 'La porte', '150'],
    [EMBARCADERE, 'L’océan', '190'],
    [PORTRAIT, 'Sur place', '160'],
  ];
  return (
    <Shell active={1}>
      <div className="as-hero tall" style={{ backgroundImage: `url(${MAISON})` }}>
        <span>MÉMOIRE</span>
        <strong>Maison des Esclaves</strong>
      </div>
      <p className="as-copy">
        Lieu de recueillement et patrimoine mondial de l'UNESCO. Photos, récit audio et carte.
      </p>
      <div className="as-cta">Écouter le récit</div>
      <p className="as-h">Photos du lieu</p>
      <div className="as-mosaic">
        {photos.map(([src, title, h]) => (
          <div key={title}>
            <img src={src} alt="" style={{ height: `${h / 3.2}px` }} />
            <strong>{title}</strong>
            <small>● Mémoire</small>
          </div>
        ))}
      </div>
      <Listen title="Histoire de la maison" meta="Récit · 5 min" img={DSC} />
      <Listen title="La porte du voyage sans retour" meta="Audio · 3 min" img={VUE} />
    </Shell>
  );
}
