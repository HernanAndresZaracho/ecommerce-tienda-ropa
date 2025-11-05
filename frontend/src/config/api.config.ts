import { config } from "./environment";
// URL base del backend
export const API_BASE_URL = config.API_BASE_URL;

// URL para endpoints de autenticación
export const API_URL = `${API_BASE_URL}/api`;

// Endpoints
export const API_ENDPOINTS = {
  // Productos
  productos: `${API_BASE_URL}/api/productos`,
  productoPorId: (id: string) => `${API_BASE_URL}/api/productos/${id}`,
  productosPorCategoria: (categoria: string) =>
    `${API_BASE_URL}/api/productos/categoria/${categoria}`,

  // Autenticación
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    registro: `${API_BASE_URL}/api/auth/registro`,
    perfil: `${API_BASE_URL}/api/auth/perfil`,
  },

  // Pedidos - NUEVO
  pedidos: {
    crear: `${API_BASE_URL}/api/pedidos`,
    obtener: (id: string) => `${API_BASE_URL}/api/pedidos/${id}`,
    misPedidos: `${API_BASE_URL}/api/pedidos/usuario/mis-pedidos`,
    confirmarPago: (id: string) =>
      `${API_BASE_URL}/api/pedidos/${id}/confirmar-pago`,
  },

  // Test
  test: `${API_BASE_URL}/api/test`,
};

/** URL para imágenes placeholder */
export const PLACEHOLDER_IMAGE = "https://placehold.co";
