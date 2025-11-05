import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "../src/config/database";
import productosRoutes from "../src/routes/productos.routes";
import authRoutes from "../src/routes/auth.routes";
import pedidosRoutes from "../src/routes/pedidos.routes";
import { apiLimiter } from "../src/middlewares/rateLimiter.middleware";

dotenv.config();

const app = express();

// Conectar a MongoDB (solo una vez)
conectarDB();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(apiLimiter);

// Rutas
app.get("/", (req, res) => {
  res.json({
    mensaje: "API E-commerce - Tienda de Ropa",
    version: "4.0 - Production",
    status: "✅ Online",
  });
});

app.use("/api/productos", productosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pedidos", pedidosRoutes);

// Exportar para Vercel Serverless
export default app;
