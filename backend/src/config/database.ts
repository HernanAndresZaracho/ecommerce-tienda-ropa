import mongoose from "mongoose";

// Función para conectar a la base de datos MongoDB
const conectarDB = async (): Promise<void> => {
  // Obtener la URI de conexión desde las variables de entorno
  try {
    // Obtener la URI de conexión desde las variables de entorno
    const mongoURI = process.env.MONGODB_URI;

    // Verificar que la URI esté definida
    if (!mongoURI) {
      // Lanzar un error si no está definida
      throw new Error(
        "MONGODB_URI no está definido en las variables de entorno"
      );
    }

    // Conectar a MongoDB usando Mongoose
    await mongoose.connect(mongoURI);

    // Conexión exitosa
    console.log("MongoDB conectado correctamente");
    // Mostrar el nombre de la base de datos conectada
    console.log(`Base de datos: ${mongoose.connection.name}`);
  } catch (error) {
    // Manejar errores de conexión
    console.error("Error al conectar MongoDB:");
    // Verificar si el error es una instancia de Error para acceder a su mensaje
    if (error instanceof Error) {
      // Imprimir el mensaje de error
      console.error(error.message);
    }
    // Salir del proceso con un código de error
    process.exit(1);
  }
};

// Manejar eventos de conexión de Mongoose
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB desconectado");
});

// Manejar errores de conexión
mongoose.connection.on("error", (err) => {
  console.error("Error en MongoDB:", err);
});

// Exportar la función de conexión
export default conectarDB;
