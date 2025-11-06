import { Document, Types } from "mongoose";

// Definición de los tipos e interfaces para el modelo Pedido
export type EstadoPedido =
  | "pendiente"
  | "pagado"
  | "enviado"
  | "entregado"
  | "cancelado";

// Detalles de cada ítem en el pedido
export interface ItemPedido {
  producto: Types.ObjectId;
  nombre: string;
  precio: number;
  cantidad: number;
  talla: string;
  imagen: string;
}

// Información de dirección de envío
export interface DireccionEnvio {
  nombre: string;
  telefono: string;
  email: string;
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}

// Interfaz principal del Pedido
export interface IPedido extends Document {
  // Referencia al usuario (opcional para pedidos de invitados)
  usuario?: Types.ObjectId | null;

  // Información de envío
  direccionEnvio: DireccionEnvio;

  // Ítems del pedido
  items: ItemPedido[];

  // Resumen de precios
  subtotal: number;
  costoEnvio: number;
  total: number;

  // Estado del pedido
  estado: EstadoPedido;

  // Información de pago
  metodoPago: "qr" | "efectivo" | "tarjeta";
  pagado: boolean;
  fechaPago?: Date;

  // Datos adicionales para pagos con QR
  qrData?: string;

  // Marcas de tiempo
  createdAt: Date;
  updatedAt: Date;
}
