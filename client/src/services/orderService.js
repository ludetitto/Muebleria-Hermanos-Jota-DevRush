import API_ENDPOINTS from "../config/api";

export async function crearPedido(orderData, token) {
  if (!token) {
    throw new Error("Token de autenticación expirado");
  }

  if (!orderData.items || orderData.items.length === 0) {
    throw new Error("El pedido debe contener al menos un producto");
  }

  if (!orderData.total || orderData.total <= 0) {
    throw new Error("El total del pedido debe ser mayor a 0");
  }

  try {
    const response = await fetch(API_ENDPOINTS.PEDIDOS.BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(response.error || "Error al crear el pedido");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearPedido:", error);
    throw error;
  }
}

export async function obtenerMisPedidos(token) {
  if (!token) {
    throw new Error("Token de autorización requerido");
  }

  try {
    const response = await fetch(API_ENDPOINTS.PEDIDOS.BASE, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener pedidos");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error en obtener mis pedidos:", error);
    throw error;
  }
}

export async function obtenerPedidoPorId(orderId, token) {
  if (!token) {
    throw new Error("Token de autenticación requerido");
  }

  if (!orderId) {
    throw new Error("ID de pedido requerido");
  }

  try {
    const response = await fetch(API_ENDPOINTS.PEDIDOS.BY_ID(orderId), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener pedido");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error en obtenerPedidoPorId:", error);
    throw error;
  }
}

//Formatear items para enviar al backend
export function formatearItemsPedido(carrito) {
  return carrito.map((item) => ({
    productoId: item.id || item._id || item.productoId,
    name: item.nombre,
    price: item.precio,
    quantity: item.cantidad,
  }));
}
