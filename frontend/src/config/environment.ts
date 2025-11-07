// frontend/src/config/environment.ts
const isDevelopment =
  // Chequea si el hostname es localhost o 127.0.0.1
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Definición de la configuración basada en el entorno
export const config = {
  // URL base de la API dependiendo del entorno
  API_BASE_URL: isDevelopment
    ? // Si está en desarrollo, usa el servidor local
      "http://localhost:5000"
    : // Si está en producción, usa la URL del servidor desplegado
      "https://ecommerce-tienda-ropa-backend.onrender.com",

  isDevelopment,
  isProduction: !isDevelopment,
};
