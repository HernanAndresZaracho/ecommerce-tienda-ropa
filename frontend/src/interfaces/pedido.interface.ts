// Interfaces relacionadas con los pedidos
export interface DireccionEnvio {
  nombre: string;
  telefono: string;
  email: string;
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}

// Detalles de cada item en el pedido
export interface ItemPedido {
  productoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  talla: string;
  imagen: string;
}

// Datos necesarios para crear un nuevo pedido
export interface CrearPedidoData {
  direccionEnvio: DireccionEnvio;
  items: ItemPedido[];
  metodoPago: "qr" | "efectivo" | "tarjeta";
}

// Estructura completa de un pedido
export interface Pedido {
  _id: string;
  direccionEnvio: DireccionEnvio;
  items: ItemPedido[];
  subtotal: number;
  costoEnvio: number;
  total: number;
  estado: "pendiente" | "pagado" | "enviado" | "entregado" | "cancelado";
  metodoPago: string;
  pagado: boolean;
  qrData?: string;
  createdAt: string;
}
