import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt.util";

// Extender la interfaz Request para incluir el usuario
export interface RequestConUsuario extends Request {
  usuario?: {
    id: string;
    email: string;
    rol: string;
  };
}

export const protegerRuta = async (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        mensaje: "No autorizado. Token no proporcionado",
      });
      return;
    }

    // Extraer el token
    const token = authHeader.split(" ")[1];

    try {
      // Verificar el token
      const decoded = verificarToken(token);

      // Agregar los datos del usuario al request
      req.usuario = {
        id: decoded.id,
        email: decoded.email,
        rol: decoded.rol,
      };

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        mensaje: "Token inválido o expirado",
      });
      return;
    }
  } catch (error) {
    console.error("Error en protegerRuta:", error);
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
