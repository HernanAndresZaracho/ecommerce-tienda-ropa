import { Document, Types } from "mongoose";

export type EstadoPedido =
  | "pendiente"
  | "pagado"
  | "enviado"
  | "entregado"
  | "cancelado";

export interface ItemPedido {
  producto: Types.ObjectId;
  nombre: string;
  precio: number;
  cantidad: number;
  talla: string;
  imagen: string;
}

export interface DireccionEnvio {
  nombre: string;
  telefono: string;
  email: string;
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}

export interface IPedido extends Document {
  // Usuario (opcional - puede ser null para invitados)
  usuario?: Types.ObjectId | null;

  // Información de contacto (obligatoria siempre)
  direccionEnvio: DireccionEnvio;

  // Productos del pedido
  items: ItemPedido[];

  // Totales
  subtotal: number;
  costoEnvio: number;
  total: number;

  // Estado del pedido
  estado: EstadoPedido;

  // Pago
  metodoPago: "qr" | "efectivo" | "tarjeta";
  pagado: boolean;
  fechaPago?: Date;

  // QR de pago
  qrData?: string;

  // Fechas
  createdAt: Date;
  updatedAt: Date;
}
