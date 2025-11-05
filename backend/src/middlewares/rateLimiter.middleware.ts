import rateLimit from "express-rate-limit";

// Rate limiter para autenticación (prevenir fuerza bruta)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos
  message: {
    success: false,
    mensaje:
      "Demasiados intentos de inicio de sesión. Intente nuevamente en 15 minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter general para la API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests
  message: {
    success: false,
    mensaje: "Demasiadas solicitudes. Intente nuevamente más tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para creación de pedidos
export const pedidosLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Máximo 10 pedidos por hora
  message: {
    success: false,
    mensaje: "Ha alcanzado el límite de pedidos por hora. Intente más tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
