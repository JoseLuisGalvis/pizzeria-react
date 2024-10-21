// src/components/Menu_2.jsx

import { useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import PedidoModal from './PedidoModal';
import VerPedidoModal from './VerPedidoModal';
import '../App.css';

const empanadas = [
  {
    id: 1,
    name: 'Carne',
    description: 'Empanadas de Carne.',
    price: 10.99,
    image: '/images/emp-carne.png',
  },
  {
    id: 2,
    name: 'Pollo',
    description: 'Empanadas de Pollo.',
    price: 10.99,
    image: '/images/emp-pollo.jpg',
  },
  {
    id: 3,
    name: 'Queso',
    description: 'Empanadas de Queso.',
    price: 10.99,
    image: '/images/emp-queso.jpg',
  },
  {
    id: 4,
    name: 'Jamon y Queso',
    description: 'Empanadas de Jamon y Queso.',
    price: 10.99,
    image: '/images/emp-jamque.jpg',
  },
];

const Menu_2 = () => {
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
    <div id="menu_2" className="container mt-5">
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
      <section
        id="empanadas"
        data-aos="zoom-in"
        data-aos-duration="3000"
        data-aos-delay="400"
      >
        <h2 className="mb-4">Empanadas</h2>
        <div className="row">
          {empanadas.map(empanada => (
            <div className="col-md-3 mb-4" key={empanada.id}>
              <div className="card menu-item">
                <img src={empanada.image} alt={empanada.name} id="emp-img" />
                <div className="card-body">
                  <h5 className="card-title">{empanada.name}</h5>
                  <p className="card-text">{empanada.description}</p>
                  <p className="card-price"><strong>Precio: ${empanada.price.toFixed(2)}</strong></p>
                  <button
                    className="btn btn-orange text-white agregar-al-pedido"
                    onClick={() => handleShowModal(empanada)}
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

export default Menu_2;

