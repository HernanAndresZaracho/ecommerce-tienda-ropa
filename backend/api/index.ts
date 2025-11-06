import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "../src/config/database";
import productosRoutes from "../src/routes/productos.routes";
import authRoutes from "../src/routes/auth.routes";
import pedidosRoutes from "../src/routes/pedidos.routes";
import { apiLimiter } from "../src/middlewares/rateLimiter.middleware";

// Configurar variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app = express();
// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(
  // Configurar CORS
  cors({
    // Permitir solicitudes desde el frontend
    origin: process.env.FRONTEND_URL || "*",
    // Permitir el envío de cookies y credenciales
    credentials: true,
  })
);

// Middleware para parsear JSON
app.use(express.json());
// Middleware de limitación de tasas
app.use(apiLimiter);

// Rutas
app.get("/", (req, res) => {
  // Ruta de bienvenida
  res.json({
    mensaje: "API E-commerce - Tienda de Ropa",
    version: "4.0 - Production",
    status: "Online",
  });
});

// Rutas de la API
// Productos
app.use("/api/productos", productosRoutes);
// Autenticación
app.use("/api/auth", authRoutes);
// Pedidos
app.use("/api/pedidos", pedidosRoutes);

// Exportar para Vercel Serverless
export default app;
