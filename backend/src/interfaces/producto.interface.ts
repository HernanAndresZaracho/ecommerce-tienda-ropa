import { Document } from "mongoose";

export type Categoria = "remera" | "camisa" | "pantalon";

export type Talla = "XS" | "S" | "M" | "L" | "XL" | "XXL";

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
