import React, { useState, useEffect } from "react";
import "../assets/css/quantityControl.css";

export default function QuantityControl({
  productoId,
  cantidad,
  actualizarCantidad,
  min = 1,
  max = 99,
}) {
  const [valorLocal, setValorLocal] = useState(String(cantidad));

  useEffect(() => {
    setValorLocal(String(cantidad));
  }, [cantidad]);

  const parseAndClamp = (v) => {
    const n = Number(v);
    if (Number.isNaN(n)) return null;
    return Math.max(min, Math.min(max, Math.floor(n)));
  };

  const handleInputChange = (e) => {
    const v = e.target.value;
    if (v === "" || /^-?\d*$/.test(v)) {
      setValorLocal(v);
      const parsed = parseAndClamp(v);
      if (parsed !== null) {
        actualizarCantidad(productoId, parsed);
      }
    }
  };

  const handleBlur = () => {
    if (valorLocal === "" || parseAndClamp(valorLocal) === null) {
      setValorLocal(String(min));
      actualizarCantidad(productoId, min);
    } else {
      const clamped = parseAndClamp(valorLocal);
      setValorLocal(String(clamped));
      actualizarCantidad(productoId, clamped);
    }
  };

  const incrementar = () => {
    const current = parseAndClamp(valorLocal) ?? parseAndClamp(cantidad) ?? min;
    if (current < max) {
      const next = current + 1;
      setValorLocal(String(next));
      actualizarCantidad(productoId, next);
    }
  };

  const disminuir = () => {
    const current = parseAndClamp(valorLocal) ?? parseAndClamp(cantidad) ?? min;
    if (current > min) {
      const next = current - 1;
      setValorLocal(String(next));
      actualizarCantidad(productoId, next);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      incrementar();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      disminuir();
    }
  };

  const numericValue =
    parseAndClamp(valorLocal) ?? parseAndClamp(cantidad) ?? min;

  return (
    <div className="quantity-control">
      <button
        type="button"
        className="quantity-btn"
        onClick={disminuir}
        disabled={numericValue <= min}
        aria-label="Disminuir cantidad"
      >
        −
      </button>

      <input
        type="number"
        className="quantity-input"
        min={min}
        max={max}
        value={valorLocal}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-label="Cantidad"
        inputMode="numeric"
        pattern="[0-9]*"
      />

      <button
        type="button"
        className="quantity-btn"
        onClick={incrementar}
        disabled={numericValue >= max}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
