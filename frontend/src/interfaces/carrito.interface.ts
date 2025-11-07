import { Producto } from "./producto.interface";

// Interfaces para el carrito de compras
export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  talla: string;
}

// Interface para el carrito completo
export interface Carrito {
  items: ItemCarrito[];
  total: number;
  cantidadTotal: number;
}

// Contexto del carrito de compras
export interface CarritoContextType {
  carrito: Carrito;
  agregarAlCarrito: (
    producto: Producto,
    talla: string,
    cantidad?: number
  ) => void;
  eliminarDelCarrito: (productoId: string, talla: string) => void;
  actualizarCantidad: (
    productoId: string,
    talla: string,
    cantidad: number
  ) => void;
  vaciarCarrito: () => void;
  calcularTotal: () => number;
}
