import { Document } from "mongoose";

// Definición de la interfaz para el modelo de Usuario
export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: {
    calle: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
  };
  // El rol puede ser "cliente" o "admin"
  rol: "cliente" | "admin";
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Método para comparar contraseñas
  compararPassword(passwordIngresado: string): Promise<boolean>;
}
