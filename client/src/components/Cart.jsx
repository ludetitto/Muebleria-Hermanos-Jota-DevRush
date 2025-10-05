import React from 'react';
import '../assets/css/productos.css';
import '../assets/css/cart.css';

export default function Cart({ carrito = [], onActualizarCantidad, onEliminar, onFinalizarCompra, onVolver }) {
  const total = carrito.reduce((s, p) => s + ((p.precio || 0) * (p.cantidad || 1)), 0);

  return (
    <div className="carrito-raiz">
      <h2 className="titulo-principal">Tu carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="carrito-lista">
          {carrito.map((p) => {
            const cantidad = p.cantidad || 1;
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
                    <input className="carrito-item-cantidad" type="number" min="1" max="99" value={cantidad} onChange={(e) => onActualizarCantidad(p.id, Number(e.target.value))} />
                    <button className="btn-secondary" onClick={() => onEliminar(p.id)}>Eliminar</button>
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
          <button className="btn-primary" onClick={() => onFinalizarCompra && onFinalizarCompra() } disabled={carrito.length === 0}>Finalizar compra</button>
          <button className="btn-secondary" onClick={onVolver} style={{ marginLeft: '0.5rem' }}>Volver</button>
        </div>
      </footer>
    </div>
  );
}
