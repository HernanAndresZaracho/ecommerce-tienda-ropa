import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt.util";

// Extender la interfaz Request para incluir los datos del usuario
export interface RequestConUsuario extends Request {
  usuario?: {
    id: string;
    email: string;
    rol: string;
  };
}

// Middleware para proteger rutas y verificar token JWT
export const protegerRuta = async (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Manejo de errores general
  try {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization;

    // Verificar si el token está presente
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Token no proporcionado
      res.status(401).json({
        success: false,
        mensaje: "No autorizado. Token no proporcionado",
      });
      return;
    }

    // Extraer el token
    const token = authHeader.split(" ")[1];

    // Verificar y decodificar el token
    try {
      // Verificar el token
      const decoded = verificarToken(token);

      // Adjuntar los datos del usuario a la solicitud
      req.usuario = {
        id: decoded.id,
        email: decoded.email,
        rol: decoded.rol,
      };

      // Continuar al siguiente middleware o ruta protegida
      next();
    } catch (error) {
      // Token inválido o expirado
      res.status(401).json({
        success: false,
        mensaje: "Token inválido o expirado",
      });
      return;
    }
    // Manejo de errores general
  } catch (error) {
    // Error inesperado
    console.error("Error en protegerRuta:", error);
    // Responder con error del servidor
    res.status(500).json({
      success: false,
      mensaje: "Error del servidor",
    });
  }
};

// Middleware opcional para verificar rol de admin
export const esAdmin = (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
): void => {
  if (req.usuario?.rol !== "admin") {
    res.status(403).json({
      success: false,
      mensaje: "Acceso denegado. Se requieren privilegios de administrador",
    });
    return;
  }
  next();
};
