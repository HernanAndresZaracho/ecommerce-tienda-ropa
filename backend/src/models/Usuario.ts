import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUsuario } from "../interfaces/usuario.interface";

// Definición del esquema de Usuario
const UsuarioSchema: Schema = new Schema<IUsuario>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede tener más de 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingrese un email válido",
      ],
    },
    // Contraseña del usuario
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      // Hashear la contraseña antes de guardar
      // No devolver el campo password en las consultas por defecto
      select: false,
    },
    telefono: {
      type: String,
      trim: true,
    },
    direccion: {
      calle: { type: String },
      ciudad: { type: String },
      provincia: { type: String },
      codigoPostal: { type: String },
    },
    rol: {
      type: String,
      enum: ["cliente", "admin"],
      default: "cliente",
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware para hashear la contraseña antes de guardar
UsuarioSchema.pre("save", async function (next) {
  // Solo hashear si la contraseña fue modificada
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    // Asegurar que password es string
    const passwordString = this.password as string;
    this.password = await bcrypt.hash(passwordString, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
UsuarioSchema.methods.compararPassword = async function (
  passwordIngresado: string
): Promise<boolean> {
  // Asegurar que this.password es string
  return await bcrypt.compare(passwordIngresado, this.password);
};

// Exportar el modelo de Usuario
export default mongoose.model<IUsuario>("Usuario", UsuarioSchema);
