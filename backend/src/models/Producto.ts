import mongoose, { Schema } from "mongoose";
import { IProducto, Categoria, Talla } from "../interfaces/producto.interface";

// Definición del esquema para el modelo Producto
const ProductoSchema: Schema = new Schema<IProducto>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      maxlength: [500, "La descripción no puede tener más de 500 caracteres"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: {
        values: ["remera", "camisa", "pantalon"] as Categoria[],
        message: "{VALUE} no es una categoría válida",
      },
      lowercase: true,
    },
    tallas: {
      type: [String],
      required: [true, "Debe tener al menos una talla"],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: "Debe tener al menos una talla",
      },
      enum: {
        values: ["XS", "S", "M", "L", "XL", "XXL"] as Talla[],
        message: "{VALUE} no es una talla válida",
      },
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    imagen: {
      type: String,
      required: [true, "La imagen es obligatoria"],
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Opciones del esquema
    timestamps: true,
    // Desactivar la versión (__v)
    versionKey: false,
  }
);

// Exportación del modelo Producto
export default mongoose.model<IProducto>("Producto", ProductoSchema);
