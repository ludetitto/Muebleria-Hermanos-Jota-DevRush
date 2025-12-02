import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/css/confirmModal.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message = "¿Deseas continuar con esta acción?",
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  confirmButtonClass = "btn-primary",
  danger = false,
}) {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleBackdropClick = (e) => {
    // Solo cerrar si se hace clic en el backdrop, no en el contenido
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="confirm-modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`confirm-modal-content ${isOpen ? "show" : ""}`}>
        <div className="confirm-modal-header">
          <h3 id="modal-title" className="confirm-modal-title">
            {title}
          </h3>
          <button
            className="confirm-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>
        <div className="confirm-modal-body">
          <p>{message}</p>
        </div>

        <div className="confirm-modal-footer">
          <button className="btn-secondary" onClick={onClose} type="button">
            {cancelText}
          </button>
          <button
            className={`btn-secondary ${danger ? "btn-danger" : confirmButtonClass}`}
            onClick={handleConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmButtonClass: PropTypes.string,
  danger: PropTypes.bool,
};
