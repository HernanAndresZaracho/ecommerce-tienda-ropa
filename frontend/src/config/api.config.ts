import { config } from "./environment";

// URL base del backend
export const API_BASE_URL = config.API_BASE_URL;

// URL para endpoints - SIEMPRE usar la URL completa
export const API_URL = `${API_BASE_URL}/api`;

// Endpoints
export const API_ENDPOINTS = {
  // Productos
  productos: `${API_URL}/productos`,
  // Obtener un producto por su ID
  productoPorId: (id: string) => `${API_URL}/productos/${id}`,
  // Obtener productos por categoría
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
