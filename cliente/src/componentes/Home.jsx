import '../assets/CSS/index.css';
import React, { useState, useEffect } from 'react';
import iconHamburger from '../assets/img/icon-hamburger.svg';
import investImg from '../assets/img/invest.svg';
import aboutImg from '../assets/img/about.svg';
import missionImg from '../assets/img/mision.svg';
import visionImg from '../assets/img/vision.svg';

function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    const handleResize = () => {
      if (menuActive) {
        setMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuActive]);

  return (
    <div>
      <header className="hero">
        <section className="hero__main container">
          <figure className="hero__figure">
            <img src={investImg} className="hero__img" alt="Invest" />
          </figure>
          <article className="hero__texts">
            <h1 className="hero__title">PayRoll Gestiona Tú Nomina</h1>
            <p className="hero__paragraph">
              PayRoll es un software diseñado para transformar la manera en que administras las nóminas en tu empresa. Olvídate de los procesos manuales y complicados. Con PayRoll, podrás gestionar todos los aspectos relacionados con las nóminas de manera eficiente y sin errores.
            </p>
          </article>
        </section>
      </header>
      <main className="main">
        <section className="features container">
          <div className="features__content">
            <h2 className="features__title">Características</h2>
            <p className="features__paragraph">
              Nuestro software de nómina automatiza pagos, deducciones y beneficios, asegurando precisión, cumplimiento legal y accesibilidad para empleados y administradores.
            </p>
            <ul className="features__list">
              <li className="features__element">
                <a
                  href="#"
                  className={`features__tab ${activeTab === 1 ? 'features__tab--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(1);
                  }}
                >
                  Sobre Nosotros
                </a>
              </li>
              <li className="features__element">
                <a
                  href="#"
                  className={`features__tab ${activeTab === 2 ? 'features__tab--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(2);
                  }}
                >
                  Misión
                </a>
              </li>
              <li className="features__element">
                <a
                  href="#"
                  className={`features__tab ${activeTab === 3 ? 'features__tab--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(3);
                  }}
                >
                  Visión
                </a>
              </li>
            </ul>
          </div>
          <div className="features__container">
            <article className={`features__article ${activeTab === 1 ? 'features__article--active' : ''}`}>
              <figure className="features__figure">
                <img src={aboutImg} className="features__img" alt="About Us" />
              </figure>
              <div className="features__texts">
                <h3 className="features__subtitle">Sobre Nosotros</h3>
                <p className="features__copy">
                  Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.
                </p>
                <a href="#" className="features__cta">More Info</a>
              </div>
            </article>
            <article className={`features__article ${activeTab === 2 ? 'features__article--active' : ''}`}>
              <figure className="features__figure">
                <img src={missionImg} className="features__img" alt="Mission" />
              </figure>
              <div className="features__texts">
                <h3 className="features__subtitle">Misión</h3>
                <p className="features__copy">
                  Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.
                </p>
                <a href="#" className="features__cta">More Info</a>
              </div>
            </article>
            <article className={`features__article ${activeTab === 3 ? 'features__article--active' : ''}`}>
              <figure className="features__figure">
                <img src={visionImg} className="features__img" alt="Vision" />
              </figure>
              <div className="features__texts">
                <h3 className="features__subtitle">Visión</h3>
                <p className="features__copy">
                  Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.
                </p>
                <a href="#" className="features__cta">More Info</a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;