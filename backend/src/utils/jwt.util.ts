import jwt from "jsonwebtoken";

// Definimos la estructura del payload del JWT
interface JWTPayload {
  id: string;
  email: string;
  rol: string;
}

// Función para generar un token JWT
export const generarToken = (payload: JWTPayload): string => {
  // Aseguramos que la variable de entorno JWT_SECRET esté definida
  const secret = process.env.JWT_SECRET;

  // Lanzamos un error si no está definida
  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }

  // Generamos y retornamos el token con una expiración de 7 días
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

// Función para verificar un token JWT
export const verificarToken = (token: string): JWTPayload => {
  // Aseguramos que la variable de entorno JWT_SECRET esté definida
  const secret = process.env.JWT_SECRET;

  // Lanzamos un error si no está definida
  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }

  // Verificamos y retornamos el payload del token
  return jwt.verify(token, secret) as JWTPayload;
};
