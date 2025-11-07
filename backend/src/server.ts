import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/database";
import productosRoutes from "./routes/productos.routes";
import authRoutes from "./routes/auth.routes";
import pedidosRoutes from "./routes/pedidos.routes";
import { apiLimiter } from "./middlewares/rateLimiter.middleware";

dotenv.config();

const app = express();

const PORT: number = parseInt(process.env.PORT || "5000");

conectarDB();

// Middlewares de seguridad
// Helmet para proteger cabeceras HTTP
app.use(
  helmet({
    // Desactivar CSP en backend (se maneja en frontend)
    contentSecurityPolicy: false,
    // Desactivar COEP para evitar conflictos con recursos de terceros
    crossOriginEmbedderPolicy: false,
  })
);

// Configuración de CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://ecommerce-tienda-ropa-5dk7tb3mz-hernan-andres-zarachos-projects.vercel.app",
      // Por si Vercel asigna un dominio más corto
      "https://ecommerce-tienda-ropa.vercel.app",
      // Permite cualquier subdominio de vercel.app
      /\.vercel\.app$/,
    ],
    credentials: true,
  })
);
// Middleware para parsear JSON
app.use(express.json());
// Aplicar limitador de tasa a todas las rutas de la API
app.use(apiLimiter);

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.json({
    mensaje: "API E-commerce - Tienda de Ropa",
    version: "4.0 - TypeScript + MongoDB + Auth JWT + Pedidos + Seguridad",
    endpoints: {
      productos: "/api/productos",
      categorias: "/api/productos/categoria/:categoria",
      producto: "/api/productos/:id",
      auth: "/api/auth",
      pedidos: "/api/pedidos",
    },
  });
});

// Ruta raíz
app.get("/api/test", (req: Request, res: Response) => {
  res.json({
    mensaje: "Backend funcionando con TypeScript!",
    fecha: new Date().toLocaleString(),
    tecnologia: "TypeScript + Express + MongoDB + JWT + Pedidos + Seguridad",
    database: "Conectado",
  });
});

// Rutas de productos
app.use("/api/productos", productosRoutes);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de pedidos
app.use("/api/pedidos", pedidosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor TypeScript corriendo en http://localhost:${PORT}`);
});
