import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/database";
import productosRoutes from "./routes/productos.routes";

dotenv.config();

const app = express();

const PORT: number = parseInt(process.env.PORT || "5000");

conectarDB();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.json({
    mensaje: "API E-commerce - Tienda de Ropa",
    version: "2.1 - TypeScript + MongoDB",
    endpoints: {
      productos: "/api/productos",
      categorias: "/api/productos/categoria/:categoria",
      producto: "/api/productos/:id",
    },
  });
});

// Ruta raíz
app.get("/api/test", (req: Request, res: Response) => {
  res.json({
    mensaje: "Backend funcionando con TypeScript! 🚀",
    fecha: new Date().toLocaleString(),
    tecnologia: "TypeScript + Express + MongoDB",
    database: "Conectado",
  });
});

// Rutas de productos
app.use("/api/productos", productosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor TypeScript corriendo en http://localhost:${PORT}`);
});
