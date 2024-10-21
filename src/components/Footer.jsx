// src/components/Footer.jsx

import 'react';

const Footer = () => {
  return (
    <footer id="contacto" className="footer bg-dark text-white">
      <div className="container">
        <div className="row">
          {/* Columna de Contacto */}
          <div className="col-md-4">
            <h5>Contacto</h5>
            <p>Dirección: Calle Principal 123, Ciudad</p>
            <p>Teléfono: (123) 456-7890</p>
            <p>Email: info@donremolo.com</p>
          </div>

          {/* Columna de Horarios */}
          <div className="col-md-4">
            <h5>Horarios</h5>
            <p>Lunes a Viernes: 11:00 AM - 10:00 PM</p>
            <p>Sábados y Domingos: 12:00 PM - 11:00 PM</p>
          </div>

          {/* Columna de Redes Sociales */}
          <div className="col-md-4">
            <h5>Síguenos</h5>
            <a href="#" className="me-2 text-white">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" className="me-2 text-white">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
