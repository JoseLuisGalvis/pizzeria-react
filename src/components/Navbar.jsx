// src/components/Navbar.jsx

import { useEffect, useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import "../App.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import VerPedidoModal from './VerPedidoModal';

const Navbar = () => {
  const { order, clearOrder } = useContext(OrderContext);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [showVerPedidoModal, setShowVerPedidoModal] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  useEffect(() => {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
  }, []);

  useEffect(() => {
    // Enlaces que NO son dropdown-toggle (Enlaces normales)
    const navbarLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    
    // Enlaces dentro de los dropdowns (opciones del submenú)
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Elementos que despliegan los dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
    // Cerrar menú principal al hacer clic en enlaces normales
    navbarLinks.forEach(link => {
      link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide(); // Cierra el menú colapsado
      });
    });
  
    // Cerrar menú principal al hacer clic en una opción del submenú
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide(); // Cierra el menú colapsado al seleccionar opción del submenú
      });
    });
  
    // Permitir que el dropdown se despliegue sin cerrar el menú principal
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const isDropdownOpen = toggle.getAttribute('aria-expanded') === 'true';
        if (!isDropdownOpen) {
          e.stopPropagation(); // Evita que el menú principal se cierre al abrir el dropdown
        }
      });
    });
  
    return () => {
      // Limpiar los event listeners
      navbarLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      dropdownItems.forEach(item => {
        item.removeEventListener('click', () => {});
      });
      dropdownToggles.forEach(toggle => {
        toggle.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Manejadores para el modal
  const handleShowVerPedido = () => {
    setShowVerPedidoModal(true);
  };

  const handleCloseVerPedido = () => {
    setShowVerPedidoModal(false);
  };

  // Calcular cantidad total de items
  const cantidadTotal = order.reduce((total, item) => total + item.cantidad, 0);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img id="logo" src="/images/logo.jpg" alt="Logo" className="me-2" />
            <h4 className="text-white mb-0">Pizzería Don Remolo</h4>
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#hero">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">Nosotros</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#menu"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menú
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#menu_1">Pizzas</a></li>
                  <li><a className="dropdown-item" href="#menu_2">Empanadas</a></li>
                  <li><a className="dropdown-item" href="#menu_3">Bebidas</a></li>
                  <li><a className="dropdown-item" href="#menu_4">Postres</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>
          {/* Botón para ver el pedido actual */}
          <button className="btn btn-orange text-white" onClick={handleShowVerPedido}>
            Ver Pedido ({cantidadTotal})
          </button>
          <button 
            onClick={toggleDarkMode} 
            className="toggle-button m-2" 
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </nav>
      {/* Modal para ver el pedido completo */}
      <VerPedidoModal
        showModal={showVerPedidoModal}
        handleClose={handleCloseVerPedido}
        pedido={order}
        handleEnviarPedido={clearOrder}
      />
    </>
  );
};

export default Navbar;



