// src/components/Menu_3.jsx

import { useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import PedidoModal from './PedidoModal';
import VerPedidoModal from './VerPedidoModal';
import '../App.css';

const bebidas = [
  {
    id: 1,
    name: 'Refrescos',
    description: 'Pepsi, Coca Cola, Fanta, Sprite, Pomelo.',
    price: 10.99,
    image: '/images/refrescos.png',
  },
  {
    id: 2,
    name: 'Agua',
    description: 'Agua Mineral Envasada.',
    price: 10.99,
    image: '/images/agua.png',
  },
  {
    id: 3,
    name: 'Cafe',
    description: 'Café Latte, Mokachino, Negro, Cortado.',
    price: 10.99,
    image: '/images/cafe.png',
  },
  {
    id: 4,
    name: 'Cervezas',
    description: 'Cervezas Tradicionales y Artesanales.',
    price: 10.99,
    image: '/images/cerveza.png',
  },
];

const Menu_3 = () => {
  const { addToOrder, clearOrder } = useContext(OrderContext);
  const [order, setOrder] = useState([]); // Lista de pedidos
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVerPedidoModal, setShowVerPedidoModal] = useState(false);

  const handleAddToOrder = (producto, cantidad) => {
    const newOrderItem = { ...producto, cantidad };
    addToOrder(newOrderItem); // Agrega al pedido usando el contexto
  };

  const handleShowModal = (producto) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Nuevos manejadores para VerPedidoModal
  const handleShowVerPedido = () => {
    setShowVerPedidoModal(true);
  };

  const handleCloseVerPedido = () => {
    setShowVerPedidoModal(false);
  };

  const handleEnviarPedido = () => {
    clearOrder(); // Limpia el pedido en el contexto
    setOrder([]); // Limpia el pedido localmente (opcional si solo usas el contexto)
  };

  return (
    <div id="menu_3" className="container mt-5">
      <h2 id="menu-title" className="text-center mt-5 mb-5">Menú</h2>
            {/* Botón para ver el pedido actual */}
            {order.length > 0 && (
        <div className="text-end mb-3">
          <button 
            className="btn btn-primary"
            onClick={handleShowVerPedido}
          >
            Ver Pedido ({order.length})
          </button>
        </div>
      )}
      <section id="bebidas"
          data-aos="zoom-in"
          data-aos-duration="3000"
          data-aos-delay="400"
      >
        <h2 className="mb-4">Bebidas</h2>
        <div className="row">
          {bebidas.map(bebida => (
            <div className="col-md-3 mb-4" key={bebida.id}>
              <div className="card menu-item">
                <img src={bebida.image} alt={bebida.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{bebida.name}</h5>
                  <p className="card-text">{bebida.description}</p>
                  <p className="card-price"><strong>Precio: ${bebida.price.toFixed(2)}</strong></p>
                  <button
                    className="btn btn-orange text-white agregar-al-pedido"
                    onClick={() => handleShowModal(bebida)}
                  >
                    Agregar al pedido
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
            {/* Modal para agregar productos */}
      {selectedProducto && (
        <PedidoModal
          producto={selectedProducto}
          showModal={showModal}
          handleClose={handleCloseModal}
          handleAddToOrder={handleAddToOrder}
        />
      )}

      {/* Modal para ver el pedido completo */}
      <VerPedidoModal
        showModal={showVerPedidoModal}
        handleClose={handleCloseVerPedido}
        pedido={order}
        handleEnviarPedido={handleEnviarPedido}
      />
    </div>
  );
};

export default Menu_3;
