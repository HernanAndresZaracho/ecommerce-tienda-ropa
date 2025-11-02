import { Document } from "mongoose";

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
  rol: "cliente" | "admin";
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  compararPassword(passwordIngresado: string): Promise<boolean>;
}
