import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  email: string;
  rol: string;
}

export const generarToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }

  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const verificarToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }

  return jwt.verify(token, secret) as JWTPayload;
};
