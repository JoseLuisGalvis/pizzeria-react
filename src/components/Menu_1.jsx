// src/components/Menu_1.jsx

import { useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import PedidoModal from './PedidoModal';
import VerPedidoModal from './VerPedidoModal';
import '../App.css';

const pizzas = [
  {
    id: 1,
    name: 'Pizza Margarita',
    description: 'Deliciosa pizza con tomate, mozzarella y albahaca.',
    price: 10.99,
    image: '/images/margarita.png',
  },
  {
    id: 2,
    name: 'Pizza Vegetariana',
    description: 'Opción fresca y colorida, cargada de verduras como pimientos, champiñones, cebollas y aceitunas.',
    price: 10.99,
    image: '/images/vegetariana.png',
  },
  {
    id: 3,
    name: 'Pizza Pepperoni',
    description: 'Pizza americana cubierta con rodajas de salami picante, que le da un toque crujiente y sabroso.',
    price: 10.99,
    image: '/images/pepperoni.png',
  },
  {
    id: 4,
    name: 'Pizza Cuatro Quesos',
    description: 'Combinación de quesos que incluye mozzarella, gorgonzola, parmesano y ricotta.',
    price: 10.99,
    image: '/images/cuatro_quesos.png',
  },
];

const Menu_1 = () => {
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
    <div id="menu_1" className="container mt-5">
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
        id="pizzas"
        data-aos="zoom-in"
        data-aos-duration="3000"
        data-aos-delay="400"
      >
        <h2 className="mb-4">Pizzas</h2>
        <div className="row d-flex align-items-stretch">
          {pizzas.map(pizza => (
            <div className="col-md-3 mb-4" key={pizza.id}>
              <div className="card menu-item">
                <img src={pizza.image} className="card-img-top" alt={pizza.name} />
                <div className="card-body">
                  <h5 className="card-title">{pizza.name}</h5>
                  <p className="card-text">{pizza.description}</p>
                  <p className="card-price"><strong>Precio: ${pizza.price.toFixed(2)}</strong></p>
                  <button className="btn btn-orange text-white" onClick={() => handleShowModal(pizza)}>
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

export default Menu_1;



