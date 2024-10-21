// src/components/About.jsx
import { useEffect, useRef, useState } from 'react';
import '../App.css';

const About = () => {
  const socialLinks = [
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' }
  ];

  const aboutSectionRef = useRef(null); // Referencia al contenedor
  const [isInView, setIsInView] = useState(false); // Estado para saber si está visible

  useEffect(() => {
    const aboutSection = aboutSectionRef.current;

    // Callback para el observer cuando el elemento entra/sale del viewport
    const observerCallback = (entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting); // Se actualiza el estado cuando entra/sale del viewport
    };

    // Configurar el IntersectionObserver
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // El 50% del componente debe estar visible
    });

    if (aboutSection) {
      observer.observe(aboutSection); // Observar la sección
    }

    return () => {
      if (aboutSection) observer.unobserve(aboutSection); // Dejar de observar al desmontar
    };
  }, []);

  // Si está en el viewport, se añade la nueva animación
  useEffect(() => {
    const aboutSection = aboutSectionRef.current;
    if (isInView && aboutSection) {
      aboutSection.setAttribute('transition-style', 'in:circle:center');
    }
  }, [isInView]);

  return (
    <section
      id="about"
      className="about-section section-vh-100"
      ref={aboutSectionRef} // Referencia al contenedor
    >
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-md-6"
            data-aos="zoom-in"
            data-aos-duration="3000"
            data-aos-delay="400"
          >
            <img
              src="/images/pizza.jpg"
              alt="pizzeria"
              className="img-fluid"
            />
          </div>
          <div
            className="col-md-6"
            data-aos="zoom-in"
            data-aos-duration="3000"
            data-aos-delay="400"
          >
            <h2 className="section-title">Nosotros</h2>
            <p className="text">
              En Pizzeria Don Rémolo, nos enorgullecemos de ser un destino para
              los amantes de la Pizza y la conversación amena. Nos dedicamos a
              ofrecer una experiencia gastronómica excepcional en un ambiente
              acogedor, donde los clientes pueden relajarse, descansar y
              disfrutar de la calidad de nuestros platos.
            </p>
            <div className="social-link-list">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={`btn btn-outline-secondary fw-bold${index < socialLinks.length - 1 ? ' me-2' : ''}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


