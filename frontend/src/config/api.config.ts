import { config } from "./environment";

// URL base del backend
export const API_BASE_URL = config.API_BASE_URL;

// URL para endpoints de autenticación
export const API_URL = config.isDevelopment ? `${API_BASE_URL}/api` : "/api";

// Endpoints
export const API_ENDPOINTS = {
  // Productos
  productos: `${API_URL}/productos`,
  productoPorId: (id: string) => `${API_URL}/productos/${id}`,
  productosPorCategoria: (categoria: string) =>
    `${API_URL}/productos/categoria/${categoria}`,

  // Autenticación
  auth: {
    login: `${API_URL}/auth/login`,
    registro: `${API_URL}/auth/registro`,
    perfil: `${API_URL}/auth/perfil`,
  },

  // Pedidos
  pedidos: {
    crear: `${API_URL}/pedidos`,
    obtener: (id: string) => `${API_URL}/pedidos/${id}`,
    misPedidos: `${API_URL}/pedidos/usuario/mis-pedidos`,
    confirmarPago: (id: string) => `${API_URL}/pedidos/${id}/confirmar-pago`,
  },

  // Test
  test: `${API_URL}/test`,
};

/** URL para imágenes placeholder */
export const PLACEHOLDER_IMAGE = "https://placehold.co";
