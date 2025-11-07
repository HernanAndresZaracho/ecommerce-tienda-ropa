// Interfaces relacionadas con los productos
export type Categoria = "remera" | "camisa" | "pantalon";
// Tipos de tallas disponibles
export type Talla = "XS" | "S" | "M" | "L" | "XL" | "XXL";

// Interface que define la estructura de un producto
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

// Interface para la respuesta que contiene múltiples productos
export interface RespuestaProductos {
  success: boolean;
  cantidad: number;
  productos: Producto[];
}

// Interface para la respuesta que contiene un solo producto
export interface RespuestaProducto {
  success: boolean;
  producto: Producto;
}
