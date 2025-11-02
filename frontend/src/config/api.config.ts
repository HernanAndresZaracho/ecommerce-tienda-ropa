// URL base del backend
export const API_BASE_URL = "http://localhost:5000";

// URL para endpoints de autenticación (nueva export)
export const API_URL = `${API_BASE_URL}/api`;

// Endpoints
export const API_ENDPOINTS = {
  // Productos
  productos: `${API_BASE_URL}/api/productos`,
  productoPorId: (id: string) => `${API_BASE_URL}/api/productos/${id}`,
  productosPorCategoria: (categoria: string) =>
    `${API_BASE_URL}/api/productos/categoria/${categoria}`,

  // Autenticación (nuevo)
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    registro: `${API_BASE_URL}/api/auth/registro`,
    perfil: `${API_BASE_URL}/api/auth/perfil`,
  },

  // Test
  test: `${API_BASE_URL}/api/test`,
};

/** URL para imágenes placeholder */
export const PLACEHOLDER_IMAGE = "https://placehold.co";
