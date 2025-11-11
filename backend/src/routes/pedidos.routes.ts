import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Pedido from "../models/Pedido";
import Producto from "../models/Producto";
import {
  protegerRuta,
  RequestConUsuario,
} from "../middlewares/auth.middleware";
import { Types } from "mongoose";
import { pedidosLimiter } from "../middlewares/rateLimiter.middleware";
import { verificarToken } from "../utils/jwt.util";

const router = express.Router();

// ==========================================
// POST /api/pedidos - Crear nuevo pedido
// ==========================================
router.post(
  "/",
  // Middleware para proteger la ruta opcionalmente
  pedidosLimiter,
  [
    body("direccionEnvio.nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
    body("direccionEnvio.telefono")
      .notEmpty()
      .withMessage("El teléfono es obligatorio"),
    body("direccionEnvio.email")
      .isEmail()
      .withMessage("Debe proporcionar un email válido"),
    body("direccionEnvio.calle")
      .notEmpty()
      .withMessage("La calle es obligatoria"),
    body("direccionEnvio.ciudad")
      .notEmpty()
      .withMessage("La ciudad es obligatoria"),
    body("direccionEnvio.provincia")
      .notEmpty()
      .withMessage("La provincia es obligatoria"),
    body("direccionEnvio.codigoPostal")
      .notEmpty()
      .withMessage("El código postal es obligatorio"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Debe haber al menos un producto"),
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

      const { direccionEnvio, items, metodoPago } = req.body;

      // Validar que los productos existan y calcular totales
      let subtotal = 0;
      const itemsProcesados = [];

      // Procesar cada item del pedido
      for (const item of items) {
        // Buscar el producto en la base de datos
        const producto = await Producto.findById(item.productoId);

        // Verificar si el producto existe
        if (!producto) {
          res.status(404).json({
            success: false,
            mensaje: `Producto con ID ${item.productoId} no encontrado`,
          });
          return;
        }

        // Verificar stock
        if (producto.stock < item.cantidad) {
          res.status(400).json({
            success: false,
            mensaje: `Stock insuficiente para ${producto.nombre}`,
          });
          return;
        }

        // Calcular precio total del item
        const precioTotal = producto.precio * item.cantidad;
        subtotal += precioTotal;

        // Agregar item procesado al array
        itemsProcesados.push({
          producto: producto._id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: item.cantidad,
          talla: item.talla,
          imagen: producto.imagen,
        });
      }

      // Calcular costos adicionales
      const costoEnvio = 0; // Envío gratis
      const total = subtotal + costoEnvio;

      // Generar datos del QR (simulado)
      const qrData = `PAGO_${Date.now()}_${total}`;

      // Crear el pedido
      const nuevoPedido = new Pedido({
        // Si el usuario está autenticado, asociar el pedido a su ID
        usuario: req.usuario?.id || null,
        direccionEnvio,
        items: itemsProcesados,
        subtotal,
        costoEnvio,
        total,
        metodoPago: metodoPago || "qr",
        qrData,
      });

      // Guardar el pedido en la base de datos
      await nuevoPedido.save();

      // Actualizar stock de productos
      for (const item of items) {
        await Producto.findByIdAndUpdate(item.productoId, {
          $inc: { stock: -item.cantidad },
        });
      }

      // Responder con los detalles del pedido creado
      res.status(201).json({
        success: true,
        mensaje: "Pedido creado exitosamente",
        data: {
          pedidoId: nuevoPedido._id,
          total,
          qrData,
          estado: nuevoPedido.estado,
        },
      });
    } catch (error) {
      console.error("Error al crear pedido:", error);
      res.status(500).json({
        success: false,
        mensaje: "Error al crear pedido",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// ==========================================
// POST /api/pedidos - Crear nuevo pedido
// ==========================================
router.post(
  "/",
  [
    body("direccionEnvio.nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
    body("direccionEnvio.telefono")
      .notEmpty()
      .withMessage("El teléfono es obligatorio"),
    body("direccionEnvio.email")
      .isEmail()
      .withMessage("Debe proporcionar un email válido"),
    body("direccionEnvio.calle")
      .notEmpty()
      .withMessage("La calle es obligatoria"),
    body("direccionEnvio.ciudad")
      .notEmpty()
      .withMessage("La ciudad es obligatoria"),
    body("direccionEnvio.provincia")
      .notEmpty()
      .withMessage("La provincia es obligatoria"),
    body("direccionEnvio.codigoPostal")
      .notEmpty()
      .withMessage("El código postal es obligatorio"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Debe haber al menos un producto"),
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

      const { direccionEnvio, items, metodoPago } = req.body;

      // Obtener el ID del usuario del token si está autenticado
      let usuarioId = null;
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
          const token = authHeader.split(" ")[1];
          const decoded = verificarToken(token);
          usuarioId = decoded.id; // 👈 EXTRAER ID DEL TOKEN
        } catch (error) {
          console.log(
            "Token inválido o no proporcionado, creando pedido como invitado"
          );
        }
      }

      // Validar que los productos existan y calcular totales
      let subtotal = 0;
      const itemsProcesados = [];

      // Procesar cada item del pedido
      for (const item of items) {
        // Buscar el producto en la base de datos
        const producto = await Producto.findById(item.productoId);

        // Verificar si el producto existe
        if (!producto) {
          res.status(404).json({
            success: false,
            mensaje: `Producto con ID ${item.productoId} no encontrado`,
          });
          return;
        }

        // Verificar stock
        if (producto.stock < item.cantidad) {
          res.status(400).json({
            success: false,
            mensaje: `Stock insuficiente para ${producto.nombre}`,
          });
          return;
        }

        // Calcular precio total del item
        const precioTotal = producto.precio * item.cantidad;
        subtotal += precioTotal;

        // Agregar item procesado al array
        itemsProcesados.push({
          producto: producto._id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: item.cantidad,
          talla: item.talla,
          imagen: producto.imagen,
        });
      }

      // Calcular costos adicionales
      const costoEnvio = 0;
      const total = subtotal + costoEnvio;
      const qrData = `PAGO_${Date.now()}_${total}`;

      // Crear el pedido por invitado o usuario autenticado
      const nuevoPedido = new Pedido({
        usuario: usuarioId,
        direccionEnvio,
        items: itemsProcesados,
        subtotal,
        costoEnvio,
        total,
        metodoPago: metodoPago || "qr",
        qrData,
      });

      // Guardar el pedido en la base de datos
      await nuevoPedido.save();

      // Actualizar stock
      for (const item of items) {
        await Producto.findByIdAndUpdate(item.productoId, {
          $inc: { stock: -item.cantidad },
        });
      }

      // Responder con los detalles del pedido creado
      res.status(201).json({
        success: true,
        mensaje: "Pedido creado exitosamente",
        data: {
          pedidoId: nuevoPedido._id,
          total,
          qrData,
          estado: nuevoPedido.estado,
        },
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al crear pedido:", error);
      res.status(500).json({
        success: false,
        mensaje: "Error al crear pedido",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// ==========================================
// GET /api/pedidos/:id - Obtener pedido por ID
// ==========================================
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        mensaje: "ID de pedido inválido",
      });
      return;
    }

    // Buscar el pedido por ID
    const pedido = await Pedido.findById(id).populate("items.producto");

    // Verificar si el pedido existe
    if (!pedido) {
      res.status(404).json({
        success: false,
        mensaje: "Pedido no encontrado",
      });
      return;
    }

    // Responder con los detalles del pedido
    res.status(200).json({
      success: true,
      data: pedido,
    });
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener pedido",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// ==========================================
// GET /api/pedidos/usuario/mis-pedidos - Obtener pedidos del usuario autenticado
// ==========================================
router.get(
  "/usuario/mis-pedidos",
  protegerRuta,
  async (req: RequestConUsuario, res: Response): Promise<void> => {
    try {
      // Buscar pedidos del usuario autenticado
      const pedidos = await Pedido.find({ usuario: req.usuario?.id })
        .sort({ createdAt: -1 })
        .populate("items.producto");

      // Responder con los pedidos encontrados
      res.status(200).json({
        success: true,
        data: pedidos,
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener pedidos del usuario:", error);
      res.status(500).json({
        success: false,
        mensaje: "Error al obtener pedidos",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// ==========================================
// PUT /api/pedidos/:id/confirmar-pago - Confirmar pago de pedido
// ==========================================
router.put(
  "/:id/confirmar-pago",
  async (req: Request, res: Response): Promise<void> => {
    // Confirmar el pago del pedido
    try {
      // Extraer el ID del pedido de los parámetros
      const { id } = req.params;

      // Validar que el ID sea un ObjectId válido
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({
          success: false,
          mensaje: "ID de pedido inválido",
        });
        return;
      }

      // Actualizar el pedido para marcarlo como pagado
      const pedido = await Pedido.findByIdAndUpdate(
        id,
        {
          pagado: true,
          estado: "pagado",
          fechaPago: new Date(),
        },
        { new: true }
      );

      if (!pedido) {
        res.status(404).json({
          success: false,
          mensaje: "Pedido no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        mensaje: "Pago confirmado exitosamente",
        data: pedido,
      });
    } catch (error) {
      console.error("Error al confirmar pago:", error);
      res.status(500).json({
        success: false,
        mensaje: "Error al confirmar pago",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// Exportar el router
export default router;
