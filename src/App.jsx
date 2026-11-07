import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Participate, { isParticipateHash, JoinStand } from './pages/Participate.jsx';

function useHash() {
  const read = () => window.location.hash || '#accueil';
  const [hash, setHash] = useState(read);
  useEffect(() => {
    const sync = () => {
      setHash(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const participer = isParticipateHash(hash);

  return (
    <>
      <div className="fm-global-grid" />
      <Header />
      <main>
        {participer ? <Participate /> : (
          <>
            <Home />
            <JoinStand />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
