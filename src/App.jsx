// src/App.jsx
// npm ls
// npm update
// npm install vite -g

import { useState } from 'react';
import { OrderProvider } from './context/OrderContext'; // Agregar este import
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu_1 from './components/Menu_1';
import Menu_2 from './components/Menu_2';
import Menu_3 from './components/Menu_3';
import Menu_4 from './components/Menu_4';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 1000,
  easing: 'ease-in-out'
});

function App() {
  // Agregar estado para el pedido
  const [pedido, setPedido] = useState([]);

  // Función para agregar items al pedido
  const handleAddToOrder = (producto, cantidad) => {
    // Verificar si el producto ya existe en el pedido
    const productoExistente = pedido.find(item => item.nombre === producto.name);

    if (productoExistente) {
      // Si existe, actualizar la cantidad
      setPedido(pedido.map(item => 
        item.nombre === producto.name 
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      // Si no existe, agregar nuevo item
      setPedido([...pedido, {
        nombre: producto.name,
        precio: producto.price,
        cantidad: cantidad
      }]);
    }
  };

  // Función para limpiar todo el pedido
  const handleClearOrder = () => {
    setPedido([]);
  };

  return (
    <>
    <OrderProvider>
    <Navbar 
        pedido={pedido} 
        handleClearOrder={handleClearOrder}
      />
      <Hero />
      <About />
      <Menu_1 handleAddToOrder={handleAddToOrder} />
      <Menu_2 handleAddToOrder={handleAddToOrder} />
      <Menu_3 handleAddToOrder={handleAddToOrder} />
      <Menu_4 handleAddToOrder={handleAddToOrder} />
      <Contacto />
      <Footer />
    </OrderProvider>
    </>
  );
}

export default App;







