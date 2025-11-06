const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const config = {
  API_BASE_URL: isDevelopment
    ? "http://localhost:5000"
    : "https://ecommerce-tienda-ropa-backend.onrender.com",

  isDevelopment,
  isProduction: !isDevelopment,
};
