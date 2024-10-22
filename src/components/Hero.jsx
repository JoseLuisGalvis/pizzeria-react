// src/components/Hero.jsx

import { useEffect, useState } from 'react';

import "../App.css";

export const Hero = () => {
  
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const phoneTimeout = setTimeout(() => {
      setShowPhone(true);
      setTimeout(() => {
        setShowPhone(false);
      }, 20000);
    }, 10000);

    return () => {
      clearTimeout(phoneTimeout);
    };
  }, []);

  return (
    <section id="hero" className="hero-section section-vh-100">
      <video className="background-video" autoPlay loop muted>
        <source src="/video/video.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6" data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="400">
            <h2 className="title text-shadow">La Mejor Pizza</h2>
            <h3 className="subtitle text-shadow">
              ¡Haz que tu día sea estupendo con nuestras Pizzas Especiales!
            </h3>
            <p className="description text-shadow">
              Bienvenido a nuestro paraíso de la Pizza, donde cada una cuenta una historia y desata tu alegría.
            </p>
            <div className="buttons">
              <a href="#menu_1" className="btn btn-orange text-white" data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="400">
                Ordena Ahora
              </a>
              <a href="#contacto" className="btn btn-outline-secondary mx-2" data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="400">
                Contáctanos
              </a>
            </div>
          </div>
          {showPhone && (
            <div className="tooltip-container" 
            data-aos="animate__heartBeat" 
            data-aos-duration="3000"
          >
            <img 
              src="/images/icon.png" 
              alt="Teléfono" 
              className="telefono-icon" 
            />
            <span className="tooltip-text">Escribe al +5491234567890</span>
            <p className="call-now">Llama YA!</p>
          </div>
          
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;