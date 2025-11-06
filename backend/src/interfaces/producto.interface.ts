import { Document } from "mongoose";

// Definición de tipos y la interfaz para el modelo Producto
export type Categoria = "remera" | "camisa" | "pantalon";

// Definición de tipos y la interfaz para el modelo Producto
export type Talla = "XS" | "S" | "M" | "L" | "XL" | "XXL";

// Interfaz que representa un Producto en la base de datos
export interface IProducto extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  tallas: Talla[];
  stock: number;
  imagen: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
