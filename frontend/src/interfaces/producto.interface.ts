export type Categoria = "remera" | "camisa" | "pantalon";
export type Talla = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  tallas: Talla[];
  stock: number;
  imagen: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RespuestaProductos {
  success: boolean;
  cantidad: number;
  productos: Producto[];
}

export interface RespuestaProducto {
  success: boolean;
  producto: Producto;
}
