import React, { useState } from 'react';

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  confirmPurchase
}) => {
  const [active, setActive] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false); // Estado para controlar la visibilidad de la factura

  const onDeleteProduct = product => {
    const results = allProducts.filter(item => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  // Función para generar y mostrar la factura
  const generateInvoice = () => {
    setShowInvoice(true); // Mostramos la factura al confirmar la compra
  };

  return (
    <header>
      <h1>Tienda de Gorras</h1>
      <div className='container-icon'>
        <div className='container-cart-icon' onClick={() => setActive(!active)}>
          <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png" alt="carrito" className="icon-cart" />
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>
        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts.length ? (
            <>
              <div className='row-product'>
                {allProducts.map(product => (
                  <div className='cart-product' key={product.id}>
                    <div className='info-cart-product'>
                      <span className='cantidad-producto-carrito'>{product.quantity}</span>
                      <p className='titulo-producto-carrito'>{product.title}</p>
                      <span className='precio-producto-carrito'>${product.price}</span>
                    </div>
                    <img src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png" alt="cerrar" className="icon-close" onClick={() => onDeleteProduct(product)} />
                  </div>
                ))}
              </div>
              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total}</span>
              </div>
              <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
              </button>
              <button className='btn-confirm-purchase' onClick={confirmPurchase}>
                Confirmar Compra
              </button> {/* Botón para confirmar la compra */}
            </>
          ) : (
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
      {showInvoice && ( // Renderizamos la factura si showInvoice es true
        <div className='invoice'>
          <h2>Factura de Compra</h2>
          <div className='invoice-details'>
            <p><strong>Producto</strong></p>
            <p><strong>Cantidad</strong></p>
            <p><strong>Precio Unitario</strong></p>
            <p><strong>Precio Total</strong></p>
          </div>
          {allProducts.map(product => (
            <div className='invoice-details' key={product.id}>
              <p>{product.title}</p>
              <p>{product.quantity}</p>
              <p>${product.price}</p>
              <p>${product.price * product.quantity}</p>
            </div>
          ))}
          <div className='invoice-total'>
            <p><strong>Total:</strong></p>
            <p>${total}</p>
          </div>
        </div>
      )}
    </header>
  );
};
