import { Types } from "mongoose";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Usuario from "../models/Usuario";
import { generarToken } from "../utils/jwt.util";
import {
  protegerRuta,
  RequestConUsuario,
} from "../middlewares/auth.middleware";
import { authLimiter } from "../middlewares/rateLimiter.middleware";

// Crear router
const router = express.Router();

// ==========================================
// POST /api/auth/registro - Registrar nuevo usuario
// ==========================================
router.post(
  "/registro",
  authLimiter,
  [
    body("nombre")
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("El nombre debe tener entre 3 y 50 caracteres"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Debe proporcionar un email válido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("telefono")
      .optional()
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("El teléfono debe tener entre 8 y 20 caracteres"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validar errores
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          errores: errors.array(),
        });
        return;
      }

      const { nombre, email, password, telefono } = req.body;

      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
        res.status(400).json({
          success: false,
          mensaje: "Ya existe un usuario con ese email",
        });
        return;
      }

      // Crear nuevo usuario
      const nuevoUsuario = new Usuario({
        nombre,
        email,
        password, // Se hasheará automáticamente por el middleware del modelo
        telefono,
      });

      await nuevoUsuario.save();

      // Generar token
      const token = generarToken({
        id: (nuevoUsuario._id as Types.ObjectId).toString(),
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      });

      // Responder con datos del usuario y token
      res.status(201).json({
        success: true,
        mensaje: "Usuario registrado exitosamente",
        data: {
          token,
          usuario: {
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol,
          },
        },
      });
    } catch (error) {
      console.error("Error en registro:", error);
      res.status(500).json({
        success: false,
        mensaje: "Error al registrar usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// ==========================================
// POST /api/auth/login - Iniciar sesión
// ==========================================
router.post(
  "/login",
  authLimiter,
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Debe proporcionar un email válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validar errores
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          errores: errors.array(),
        });
        return;
      }

      const { email, password } = req.body;

      // Buscar usuario por email y traer el campo password
      const usuario = await Usuario.findOne({ email }).select("+password");

      // Verificar si el usuario existe
      if (!usuario) {
        res.status(401).json({
          success: false,
          mensaje: "Credenciales inválidas",
        });
        return;
      }

      // Verificar si el usuario está activo
      if (!usuario.activo) {
        res.status(401).json({
          success: false,
          mensaje: "Usuario inactivo. Contacte al administrador",
        });
        return;
      }

      // Comparar contraseñas
      const passwordCorrecto = await usuario.compararPassword(password);

      // Si la contraseña es incorrecta
      if (!passwordCorrecto) {
        res.status(401).json({
          success: false,
          mensaje: "Credenciales inválidas",
        });
        return;
      }

      // Generar token
      const token = generarToken({
        id: (usuario._id as Types.ObjectId).toString(),
        email: usuario.email,
        rol: usuario.rol,
      });

      // Responder con datos del usuario y token
      res.status(200).json({
        success: true,
        mensaje: "Inicio de sesión exitoso",
        data: {
          token,
          usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
          },
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({
        success: false,
        mensaje: "Error al iniciar sesión",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// ==========================================
// GET /api/auth/perfil - Obtener perfil del usuario autenticado
// ==========================================
router.get(
  "/perfil",
  // Middleware para proteger la ruta
  protegerRuta,
  async (req: RequestConUsuario, res: Response): Promise<void> => {
    try {
      const usuario = await Usuario.findById(req.usuario?.id);

      // Verificar si el usuario existe
      if (!usuario) {
        res.status(404).json({
          success: false,
          mensaje: "Usuario no encontrado",
        });
        return;
      }

      // Responder con datos del usuario
      res.status(200).json({
        success: true,
        data: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          telefono: usuario.telefono,
          direccion: usuario.direccion,
          rol: usuario.rol,
          createdAt: usuario.createdAt,
        },
      });
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      // Manejo de errores
      res.status(500).json({
        success: false,
        mensaje: "Error al obtener perfil",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// ==========================================
// PUT /api/auth/perfil - Actualizar perfil del usuario autenticado
// ==========================================
router.put(
  "/perfil",
  protegerRuta,
  [
    body("nombre")
      .optional()
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("El nombre debe tener entre 3 y 50 caracteres"),
    body("telefono")
      .optional()
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("El teléfono debe tener entre 8 y 20 caracteres"),
  ],
  async (req: RequestConUsuario, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          errores: errors.array(),
        });
        return;
      }

      // Extraer campos a actualizar
      const { nombre, telefono, direccion } = req.body;

      // Actualizar usuario
      const usuario = await Usuario.findByIdAndUpdate(
        req.usuario?.id,
        {
          ...(nombre && { nombre }),
          ...(telefono && { telefono }),
          ...(direccion && { direccion }),
        },
        { new: true, runValidators: true }
      );

      if (!usuario) {
        // Verificar si el usuario existe
        res.status(404).json({
          success: false,
          mensaje: "Usuario no encontrado",
        });
        return;
      }

      // Responder con datos actualizados
      res.status(200).json({
        success: true,
        mensaje: "Perfil actualizado exitosamente",
        data: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          telefono: usuario.telefono,
          direccion: usuario.direccion,
        },
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      // Manejo de errores
      res.status(500).json({
        success: false,
        mensaje: "Error al actualizar perfil",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// Exportar el router
export default router;
