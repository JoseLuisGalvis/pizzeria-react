// src/components/VerPedidoModal.jsx

import { useState } from 'react';
import logoImage from '/images/logo.jpg';

const VerPedidoModal = ({ showModal, handleClose, pedido, handleEnviarPedido }) => {
  // Estado para manejar el estado de envío
  const [enviando, setEnviando] = useState(false);

  const calcularTotal = () => {
    return pedido.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  const enviarPedidoWhatsApp = () => {
    try {
      setEnviando(true);
      
      let mensaje = "🍕 *PEDIDO DON REMOLO* 🍕\n\n";
      
      pedido.forEach((item) => {
        mensaje += `• ${item.cantidad}x ${item.name}\n`;
        mensaje += `   Subtotal: $${(item.price * item.cantidad).toFixed(2)}\n`;
      });

      mensaje += `\n💰 *TOTAL: $${calcularTotal().toFixed(2)}*`;
      mensaje += "\n\n🚚 Delivery propio del negocio";
      mensaje += "\n💵 Pago en efectivo";

      const numeroWhatsApp = "+549123456789"; // Reemplaza con el número real
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

      window.open(url, "_blank");
      
      // Ejecutar callback y cerrar solo si la ventana se abrió correctamente
      if (handleEnviarPedido) handleEnviarPedido();
      handleClose();
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('Hubo un error al enviar el pedido. Por favor, intente nuevamente.');
    } finally {
      setEnviando(false);
    }
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
            <div className="d-flex align-items-center">
              <img
                src={logoImage}
                alt="Logo"
                style={{ height: '40px', marginRight: '10px' }}
              />
              <h5 className="modal-title mb-0">Ver Pedido</h5>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              disabled={enviando}
            ></button>
          </div>
          <div className="modal-body">
            {pedido.length === 0 ? (
              <p className="text-center">No hay productos en el pedido</p>
            ) : (
              <>
                {pedido.map((item, index) => (
                  <div key={index} className="mb-3 p-2 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-1">{item.name}</h6>
                      <span className="badge bg-primary">{item.cantidad}x</span>
                    </div>
                    <p className="mb-0 text-end">
                      ${item.price.toFixed(2)} c/u = $
                      <strong>{(item.price * item.cantidad).toFixed(2)}</strong>
                    </p>
                  </div>
                ))}
                <hr />
                <h5 className="text-end">
                  Total: <strong>${calcularTotal().toFixed(2)}</strong>
                </h5>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleClose}
              disabled={enviando}
            >
              Cerrar
            </button>
            {pedido.length > 0 && (
              <button 
                type="button" 
                className="btn btn-orange text-white" 
                onClick={enviarPedidoWhatsApp}
                disabled={enviando}
              >
                {enviando ? 'Enviando...' : 'Confirmar Pedido'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerPedidoModal;