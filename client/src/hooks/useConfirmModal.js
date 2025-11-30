import { useState, useCallback } from "react";

//Hook para manejar el estado del modal de confirmación
//Simplifica la lógica de apertura/cierre y callbacks

export default function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "¿Estás seguro?",
    message: "¿Deseas continuar con esta acción?",
    confirmText: "Aceptar",
    cancelText: "Cancelar",
    onConfirm: () => {},
    danger: false,
  });

  const openModal = useCallback((config = {}) => {
    setModalConfig((prevConfig) => ({
      ...prevConfig,
      ...config,
    }));
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
    closeModal();
  }, [modalConfig, closeModal]);

  return {
    isOpen,
    modalConfig,
    openModal,
    closeModal,
    handleConfirm,
  };
}
