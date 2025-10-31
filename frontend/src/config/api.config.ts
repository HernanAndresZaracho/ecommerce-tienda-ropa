// URL base del backend
export const API_BASE_URL = "http://localhost:5000";

// Endpoints
export const API_ENDPOINTS = {
  // Productos
  productos: `${API_BASE_URL}/api/productos`,
  productoPorId: (id: string) => `${API_BASE_URL}/api/productos/${id}`,
  productosPorCategoria: (categoria: string) =>
    `${API_BASE_URL}/api/productos/categoria/${categoria}`,

  // Test
  test: `${API_BASE_URL}/api/test`,
};

/** URL para imágenes placeholder */
export const PLACEHOLDER_IMAGE = "https://placehold.co";
