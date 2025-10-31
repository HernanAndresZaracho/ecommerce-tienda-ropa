import mongoose from "mongoose";

const conectarDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI no está definido en las variables de entorno"
      );
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB conectado correctamente");
    console.log(`Base de datos: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("Error al conectar MongoDB:");
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB desconectado");
});

mongoose.connection.on("error", (err) => {
  console.error("Error en MongoDB:", err);
});

export default conectarDB;
