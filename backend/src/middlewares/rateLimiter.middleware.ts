import rateLimit from "express-rate-limit";

// Rate limiter para rutas de autenticación (login, registro)
// Limita a 5 intentos cada 15 minutos
// para prevenir ataques de fuerza bruta
// en endpoints sensibles
export const authLimiter = rateLimit({
  // Limita a 5 intentos cada 15 minutos
  windowMs: 15 * 60 * 1000,
  // Máximo 5 intentos
  max: 5,
  // Mensaje de respuesta cuando se excede el límite
  message: {
    success: false,
    mensaje:
      "Demasiados intentos de inicio de sesión. Intente nuevamente en 15 minutos.",
  },
  // Configuración de cabeceras
  standardHeaders: true,
  // Deshabilitar cabeceras legacy
  legacyHeaders: false,
});

// Rate limiter general para toda la API
// Limita a 100 requests cada 15 minutos
// para prevenir abuso general
// en toda la aplicación
export const apiLimiter = rateLimit({
  // 15 minutos
  windowMs: 15 * 60 * 1000,
  // Máximo 100 requests por IP
  max: 100,
  // Mensaje de respuesta cuando se excede el límite
  message: {
    success: false,
    mensaje: "Demasiadas solicitudes. Intente nuevamente más tarde.",
  },
  // Configuración de cabeceras
  standardHeaders: true,
  // Deshabilitar cabeceras legacy
  legacyHeaders: false,
});

// Rate limiter específico para la creación de pedidos
// Limita a 10 pedidos por hora
// para prevenir abuso en la creación de pedidos
export const pedidosLimiter = rateLimit({
  // 1 hora
  windowMs: 60 * 60 * 1000,
  // Máximo 10 pedidos por IP
  max: 10,
  // Mensaje de respuesta cuando se excede el límite
  message: {
    success: false,
    mensaje: "Ha alcanzado el límite de pedidos por hora. Intente más tarde.",
  },
  // Configuración de cabeceras
  standardHeaders: true,
  // Deshabilitar cabeceras legacy
  legacyHeaders: false,
});
