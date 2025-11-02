import { Producto } from "./producto.interface";

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  tallaSeleccionada: string;
}

export interface Carrito {
  items: ItemCarrito[];
  total: number;
  cantidadTotal: number;
}

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
