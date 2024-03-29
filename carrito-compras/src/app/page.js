 "use client"
 
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Headers } from './components/Headers';
import { ProductList } from './components/ProductList';
import "./globals.css";

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal 

  // Función para confirmar la compra y mostrar el modal
  const confirmPurchase = () => {
    setShowModal(true);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0); 
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Calcular el precio total por producto
  const calculateTotalPerProduct = (product) => {
    return product.quantity * product.price;
  };

  // Calcular el total general de la compra
  const calculateTotal = () => {
    let total = 0;
    allProducts.forEach((product) => {
      total += calculateTotalPerProduct(product);
    });
    return total;
  };

  // Renderizar la lista de productos comprados en el modal
  const renderProductList = () => {
    return allProducts.map((product) => (
      <div key={product.id}>
        <p>Producto: {product.title}</p>
        <p>Cantidad: {product.quantity}</p>
        <p>Precio Unitario: {product.price}</p>
        <p>Precio Total por Producto: {calculateTotalPerProduct(product)}</p>
      </div>
    ));
  };

  return (
    <>
      <Headers
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        setTotal={setTotal}
        confirmPurchase={confirmPurchase} 
      />
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Confirmación de Compra"
      >
        <div id="modalContent">
          <h2>¡Compra Confirmada!</h2>
          <p>Tu compra ha sido confirmada. ¡Gracias por tu compra!</p>
          <p>Detalles de la compra:</p>
          {renderProductList()}
          <p>Total General de la Compra: {calculateTotal()}</p>
          <button className="btn-purchase" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Home;
