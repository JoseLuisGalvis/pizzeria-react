// src/components/PedidoModal.jsx

import { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoImage from '/images/logo.jpg';

const PedidoModal = ({ producto, showModal, handleClose, handleAddToOrder }) => {
  const [cantidad, setCantidad] = useState(1);

  const handleCantidadChange = (e) => {
    setCantidad(Number(e.target.value));
  };

  const agregarPedido = () => {
    // Log para debugging
    console.log('Producto agregado:', {
      producto: producto,
      cantidad: cantidad,
      total: producto.price * cantidad
    });

    // Enviar datos al componente padre
    handleAddToOrder(producto, cantidad);
    
    // Cerrar modal y resetear estado
    handleClose();
    setCantidad(1); // Resetear la cantidad para el próximo uso
  };

  return (
    <div 
      className={`modal fade ${showModal ? 'show d-block' : ''}`} 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <img
              src={logoImage}
              alt="Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            <h5 className="modal-title">Agregar Pedido</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => {
                handleClose();
                setCantidad(1); // Resetear cantidad al cerrar
              }}
            ></button>
          </div>
          <div className="modal-body">
            <h5>{producto?.name}</h5>
            <p><strong>Precio: ${producto?.price?.toFixed(2)}</strong></p>
            <label htmlFor="cantidadInput">Cantidad:</label>
            <input
              type="number"
              id="cantidadInput"
              value={cantidad}
              min="1"
              onChange={handleCantidadChange}
              style={{ width: '60px', marginBottom: '10px' }}
            />
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => {
                handleClose();
                setCantidad(1); // Resetear cantidad al cerrar
              }}
            >
              Cerrar
            </button>
            <button 
              type="button" 
              className="btn btn-orange text-white" 
              onClick={agregarPedido}
            >
              Agregar al Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoModal;

