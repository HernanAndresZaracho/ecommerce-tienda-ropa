const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/test/", (req, res) => {
  res.json({
    mensaje: "Backend funcionando correctamente! 🚀",
    fecha: new Date().toLocaleString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "API E-commerce - Tienda de Ropa",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
