import React from 'react';
import '../assets/css/productos.css';
import '../assets/css/cart.css';

export default function Cart({ cart = [], onUpdateQuantity, onRemove, onCheckout, onBack }) {
  const total = cart.reduce((s, p) => s + ((p.precio || 0) * (p.quantity || 1)), 0);

  return (
    <div className="carrito-raiz">
      <h2 className="titulo-principal">Tu carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="carrito-lista">
          {cart.map((p) => {
            const cantidad = p.quantity || 1;
            const subtotal = (p.precio || 0) * cantidad;
            return (
              <li key={p.id} className="carrito-item">
                <img className="carrito-item-miniatura" src={p.imagen} alt={p.nombre} />
                <div className="carrito-item-cuerpo">
                  <div className="carrito-item-fila">
                    <strong>{p.nombre}</strong>
                    <span className="carrito-item-precio">${p.precio}</span>
                  </div>
                  <p className="carrito-item-descripcion">{p.descripcion}</p>
                  <div className="carrito-item-controles">
                    <input className="carrito-item-cantidad" type="number" min="1" max="99" value={cantidad} onChange={(e) => onUpdateQuantity(p.id, Number(e.target.value))} />
                    <button className="btn-secondary" onClick={() => onRemove(p.id)}>Eliminar</button>
                    <div className="carrito-item-subtotal">Subtotal: ${subtotal}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <footer className="carrito-footer">
        <div>
          <p style={{ margin: 0 }}>Total: <strong>${total}</strong></p>
        </div>
        <div>
          <button className="btn-primary" onClick={() => onCheckout && onCheckout() } disabled={cart.length === 0}>Finalizar compra</button>
          <button className="btn-secondary" onClick={onBack} style={{ marginLeft: '0.5rem' }}>Volver</button>
        </div>
      </footer>
    </div>
  );
}
