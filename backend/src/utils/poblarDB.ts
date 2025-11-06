import mongoose from "mongoose";
import dotenv from "dotenv";
import Producto from "../models/Producto";
import { Categoria, Talla } from "../interfaces/producto.interface";

// Cargar variables de entorno
dotenv.config();

// Datos iniciales de productos
const productosIniciales = [
  // REMERAS
  {
    nombre: "Remera Básica Negra",
    descripcion:
      "Remera de algodón 100%, corte clásico, ideal para uso diario. Tela suave y resistente.",
    precio: 5500,
    categoria: "remera" as Categoria,
    tallas: ["S", "M", "L", "XL"] as Talla[],
    stock: 50,
    imagen: "https://placehold.co/400x500/000000/FFFFFF?text=Remera+Negra",
    activo: true,
  },
  {
    nombre: "Remera Estampada Blanca",
    descripcion:
      "Remera con estampado moderno, tela suave y confortable. Perfecta para ocasiones casuales.",
    precio: 6200,
    categoria: "remera" as Categoria,
    tallas: ["S", "M", "L", "XL"] as Talla[],
    stock: 30,
    imagen: "https://placehold.co/400x500/FFFFFF/000000?text=Remera+Blanca",
    activo: true,
  },
  {
    nombre: "Remera Deportiva Gris",
    descripcion:
      "Remera de tela técnica, ideal para entrenar y deportes. Tecnología dry-fit.",
    precio: 7500,
    categoria: "remera" as Categoria,
    tallas: ["M", "L", "XL"] as Talla[],
    stock: 25,
    imagen: "https://placehold.co/400x500/808080/FFFFFF?text=Remera+Gris",
    activo: true,
  },

  // CAMISAS
  {
    nombre: "Camisa Formal Blanca",
    descripcion:
      "Camisa de vestir, manga larga, perfecta para ocasiones formales. Tela premium de algodón.",
    precio: 12000,
    categoria: "camisa" as Categoria,
    tallas: ["S", "M", "L", "XL"] as Talla[],
    stock: 20,
    imagen: "https://placehold.co/400x500/F0F0F0/000000?text=Camisa+Blanca",
    activo: true,
  },
  {
    nombre: "Camisa Casual Azul",
    descripcion:
      "Camisa de jean, estilo casual, manga larga enrollable. Ideal para el día a día.",
    precio: 10500,
    categoria: "camisa" as Categoria,
    tallas: ["S", "M", "L", "XL"] as Talla[],
    stock: 35,
    imagen: "https://placehold.co/400x500/0066CC/FFFFFF?text=Camisa+Azul",
    activo: true,
  },
  {
    nombre: "Camisa a Cuadros Roja",
    descripcion:
      "Camisa leñadora a cuadros, estilo urbano. Tela de franela cálida y cómoda.",
    precio: 9800,
    categoria: "camisa" as Categoria,
    tallas: ["M", "L", "XL"] as Talla[],
    stock: 18,
    imagen: "https://placehold.co/400x500/CC0000/FFFFFF?text=Camisa+Cuadros",
    activo: true,
  },

  // PANTALONES
  {
    nombre: "Jean Clásico Azul",
    descripcion:
      "Pantalón jean corte recto, tela resistente, 5 bolsillos. Un clásico que nunca falla.",
    precio: 15000,
    categoria: "pantalon" as Categoria,
    tallas: ["S", "M", "L", "XL"] as Talla[],
    stock: 40,
    imagen: "https://placehold.co/400x500/1a1a2e/FFFFFF?text=Jean+Azul",
    activo: true,
  },
  {
    nombre: "Pantalón Cargo Verde",
    descripcion:
      "Pantalón cargo con múltiples bolsillos, estilo urbano. Perfecto para aventuras.",
    precio: 13500,
    categoria: "pantalon" as Categoria,
    tallas: ["M", "L", "XL"] as Talla[],
    stock: 28,
    imagen: "https://placehold.co/400x500/2d4a2b/FFFFFF?text=Cargo+Verde",
    activo: true,
  },
  {
    nombre: "Pantalón Formal Negro",
    descripcion:
      "Pantalón de vestir, corte slim fit, para ocasiones formales. Elegante y versátil.",
    precio: 16500,
    categoria: "pantalon" as Categoria,
    tallas: ["S", "M", "L", "XL"] as Talla[],
    stock: 22,
    imagen: "https://placehold.co/400x500/000000/FFFFFF?text=Formal+Negro",
    activo: true,
  },
];

// Poblar la base de datos
const poblarDB = async (): Promise<void> => {
  try {
    // Verificar que exista MONGODB_URI
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI no está definido en el archivo .env");
    }

    // Conectar a MongoDB
    await mongoose.connect(mongoURI);
    console.log("Conectado a MongoDB");

    // Limpiar productos existentes
    const deleteResult = await Producto.deleteMany({});
    console.log(
      `${deleteResult.deletedCount} productos eliminados de la base de datos`
    );

    // Insertar productos nuevos
    const productosInsertados = await Producto.insertMany(productosIniciales);
    console.log("Productos insertados correctamente");
    console.log(`Total de productos: ${productosInsertados.length}`);

    // Mostrar resumen por categoría
    console.log("\nResumen por categoría:");
    const remeras = productosInsertados.filter(
      (p) => p.categoria === "remera"
    ).length;
    const camisas = productosInsertados.filter(
      (p) => p.categoria === "camisa"
    ).length;
    const pantalones = productosInsertados.filter(
      (p) => p.categoria === "pantalon"
    ).length;
    console.log(`  👕 Remeras: ${remeras}`);
    console.log(`  👔 Camisas: ${camisas}`);
    console.log(`  👖 Pantalones: ${pantalones}`);

    // Desconectar
    await mongoose.disconnect();
    console.log("\nDesconectado de MongoDB");
    console.log("Proceso completado exitosamente\n");
  } catch (error) {
    console.error("Error al poblar la base de datos:");
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
};

poblarDB();
