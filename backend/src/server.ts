import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT: number = parseInt(process.env.PORT || "5000");

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api/test", (req: Request, res: Response) => {
  res.json({
    mensaje: "Backend funcionando con TypeScript!",
    fecha: new Date().toLocaleString(),
    tecnologia: "TypeScript + Express",
  });
});

// Ruta raíz
app.get("/", (req: Request, res: Response) => {
  res.json({
    mensaje: "API E-commerce - Tienda de Ropa",
    version: "2.0 - TypeScript",
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor TypeScript corriendo en http://localhost:${PORT}`);
});
