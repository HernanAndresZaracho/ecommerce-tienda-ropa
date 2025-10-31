import { Router, Request, Response } from "express";
import Producto from "../models/Producto";
import { Categoria } from "../interfaces/producto.interface";

const router = Router();

/** GET /api/productos
 * Obtener todos los productos activos */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const productos = await Producto.find({ activo: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      cantidad: productos.length,
      productos,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener productos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

/** GET /api/productos/categoria/:categoria
 * Obtener productos por categoría */
router.get(
  "/categoria/:categoria",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { categoria } = req.params;

      // Validar categoría
      const categoriasValidas: Categoria[] = ["remera", "camisa", "pantalon"];
      if (!categoriasValidas.includes(categoria.toLowerCase() as Categoria)) {
        res.status(400).json({
          success: false,
          mensaje: `Categoría no válida. Categorías válidas: ${categoriasValidas.join(
            ", "
          )}`,
        });
        return;
      }

      const productos = await Producto.find({
        categoria: categoria.toLowerCase(),
        activo: true,
      }).sort({ createdAt: -1 });

      res.json({
        success: true,
        categoria,
        cantidad: productos.length,
        productos,
      });
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
      res.status(500).json({
        success: false,
        mensaje: "Error al obtener productos",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

/** GET /api/productos/:id
 * Obtener un producto por ID*/
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      res.status(404).json({
        success: false,
        mensaje: "Producto no encontrado",
      });
      return;
    }

    if (!producto.activo) {
      res.status(404).json({
        success: false,
        mensaje: "Producto no disponible",
      });
      return;
    }

    res.json({
      success: true,
      producto,
    });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

export default router;
