// src/components/Menu_4.jsx

import { useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import PedidoModal from './PedidoModal';
import VerPedidoModal from './VerPedidoModal';
import '../App.css';

const postres = [
  {
    id: 1,
    name: 'Tarta de Chocolate',
    description: 'Deliciosa tarta elaborada con una base de galleta y un relleno cremoso de chocolate negro.',
    price: 10.99,
    image: '/images/cake.png',
  },
  {
    id: 2,
    name: 'Flan de Caramelo',
    description: 'Postre de origen español, hecho a base de huevos, leche y azúcar, con una capa de caramelo.',
    price: 10.99,
    image: '/images/flan.png',
  },
  {
    id: 3,
    name: 'Mousse de Frutas',
    description: 'Ligera y esponjosa, esta mousse se elabora con puré de frutas frescas y crema batida.',
    price: 10.99,
    image: '/images/fruit.png',
  },
  {
    id: 4,
    name: 'Tiramisú',
    description: 'Postre italiano que combina capas de bizcochos empapados en café y una mezcla cremosa de mascarpone.',
    price: 10.99,
    image: '/images/tiramisu.png',
  },
];

const Menu_4 = () => {
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
    <div id="menu_4" className="container mt-5">
      <h2 id="menu-title" className="text-center mt-1 mb-5">Menú</h2>
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
      <section id="postres"          
          data-aos="zoom-in"
          data-aos-duration="3000"
          data-aos-delay="400"
          >
        <h2 className="mb-4">Postres</h2>
        <div className="row">
          {postres.map(postre => (
            <div className="col-md-3 mb-4" key={postre.id}>
              <div className="card menu-item">
                <img src={postre.image} alt={postre.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{postre.name}</h5>
                  <p className="card-text">{postre.description}</p>
                  <p className="card-price"><strong>Precio: ${postre.price.toFixed(2)}</strong></p>
                  <button
                    className="btn btn-orange text-white agregar-al-pedido"
                    onClick={() => handleShowModal(postre)}
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

export default Menu_4;
