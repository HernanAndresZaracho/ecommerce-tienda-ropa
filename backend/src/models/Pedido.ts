import mongoose, { Schema } from "mongoose";
import { IPedido, EstadoPedido } from "../interfaces/pedido.interface";

const ItemPedidoSchema = new Schema(
  {
    producto: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    talla: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const DireccionEnvioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      lowercase: true,
      trim: true,
    },
    calle: {
      type: String,
      required: [true, "La calle es obligatoria"],
      trim: true,
    },
    ciudad: {
      type: String,
      required: [true, "La ciudad es obligatoria"],
      trim: true,
    },
    provincia: {
      type: String,
      required: [true, "La provincia es obligatoria"],
      trim: true,
    },
    codigoPostal: {
      type: String,
      required: [true, "El código postal es obligatorio"],
      trim: true,
    },
  },
  { _id: false }
);

const PedidoSchema: Schema = new Schema<IPedido>(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      default: null, // Puede ser null para invitados
    },
    direccionEnvio: {
      type: DireccionEnvioSchema,
      required: true,
    },
    items: {
      type: [ItemPedidoSchema],
      required: true,
      validate: {
        validator: function (v: any[]) {
          return v.length > 0;
        },
        message: "El pedido debe tener al menos un producto",
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    costoEnvio: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    estado: {
      type: String,
      enum: [
        "pendiente",
        "pagado",
        "enviado",
        "entregado",
        "cancelado",
      ] as EstadoPedido[],
      default: "pendiente",
    },
    metodoPago: {
      type: String,
      enum: ["qr", "efectivo", "tarjeta"],
      default: "qr",
    },
    pagado: {
      type: Boolean,
      default: false,
    },
    fechaPago: {
      type: Date,
    },
    qrData: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IPedido>("Pedido", PedidoSchema);
