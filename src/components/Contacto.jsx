// src/components/Contacto.jsx

import { useEffect, useRef, useState } from 'react';
import '../App.css';
import emailjs from 'emailjs-com';

const Contacto = () => {
  const contactSectionRef = useRef(null); // Referencia al contenedor
  const [isInView, setIsInView] = useState(false); // Estado para saber si está visible

  useEffect(() => {
    // Inicializar EmailJS con tu User ID
    emailjs.init("ZFNa8J5Ckf-Cv-kv1");

    const form = document.getElementById("contactForm");
    form.addEventListener("submit", handleSubmit);

    const phoneInput = document.getElementById("inputPhone");
    phoneInput.addEventListener("input", validatePhone);

    return () => {
      form.removeEventListener("submit", handleSubmit);
      phoneInput.removeEventListener("input", validatePhone);
    };
  }, []);

  useEffect(() => {
    const contactSection = contactSectionRef.current;

    // Callback para el observer cuando el elemento entra/sale del viewport
    const observerCallback = (entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting); // Se actualiza el estado cuando entra/sale del viewport
    };

    // Configurar el IntersectionObserver
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // El 50% del componente debe estar visible
    });

    if (contactSection) {
      observer.observe(contactSection); // Observar la sección de contacto
    }

    return () => {
      if (contactSection) observer.unobserve(contactSection); // Dejar de observar al desmontar
    };
  }, []);

  // Si está en el viewport, se añade la nueva animación
  useEffect(() => {
    const contactSection = contactSectionRef.current;
    if (isInView && contactSection) {
      contactSection.setAttribute('transition-style', 'in:circle:center'); // Añadir la animación
    }
  }, [isInView]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    emailjs.sendForm("service_hc1g5ck", "template_omfi5rs", form)
      .then(() => {
        console.log("Mensaje Enviado con Éxito!");
        alert("Mensaje Enviado con Éxito");
        form.reset();
      })
      .catch((error) => {
        console.log("Error al Enviar el Mensaje", error);
        alert("Error al Enviar el Mensaje");
      });
  };

  const validatePhone = (event) => {
    if (!/^[0-9]*$/.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      alert("Por favor, ingrese solo números en el campo de Teléfono.");
    }
  };

  const validateName = (event) => {
    const regex = /^[A-Za-záéíóúñÑ ]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity("Solo se permiten letras en este campo");
      alert("Por favor, ingrese solo letras en el campo de Nombre.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  return (
    <section
      id="contacto"
      className="container-fluid py-4 parallax-section"
      ref={contactSectionRef} // Referencia al contenedor
    >
      <div className="row d-flex justify-content-center">
        <div
          className="col-lg-8 col-md-10 col-12"
          data-aos="zoom-in"
          data-aos-duration="3000"
          data-aos-delay="400"
        >
          <form id="contactForm">
            <div className="text-center mb-4">
              <h2 className="display-4 fw-bold text-dark">Contáctame</h2>
              <h4 className="text-dark">¡Me Encantaría Conocer tus Aportes y Opiniones!</h4>
            </div>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="inputName" className="text-dark">Nombre y Apellido</label>
                  <input
                    type="text"
                    id="inputName"
                    name="nombre"
                    className="form-control"
                    placeholder="Ingrese su nombre"
                    required
                    pattern="[A-Za-záéíóúñÑ ]+"
                    onInput={validateName}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="inputEmail" className="text-dark">Email</label>
                  <input
                    type="email"
                    id="inputEmail"
                    name="email"
                    className="form-control"
                    required
                    placeholder="Ingrese su email"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="inputPhone" className="text-dark">Teléfono</label>
                  <input
                    type="tel"
                    id="inputPhone"
                    name="telefono"
                    className="form-control"
                    required
                    pattern="^\+?[0-9]{7,15}$"
                    placeholder="Ingrese su teléfono"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="inputMessage" className="text-dark">Mensaje</label>
                  <textarea
                    id="inputMessage"
                    name="mensaje"
                    className="form-control"
                    required
                    placeholder="Ingrese su mensaje"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                <button
                  type="submit"
                  className="btn btn-orange text-white mt-3 btn-proyectos"
                >
                  Enviar Mensaje
                </button>
                <a
                  href="https://wa.me/1133649070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-auto"
                >
                  <img
                    src="/icons/ws.png"
                    alt="WhatsApp"
                    width="50"
                    height="50"
                    id="icon-ws"
                  />
                </a>
              </div>
            </div>
          </form>
          <a href="#hero" className="btn btn-orange mt-3 text-white text-center">Ir al Inicio</a>
        </div>
      </div>
    </section>
  );
};

export default Contacto;





