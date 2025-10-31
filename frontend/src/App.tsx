import { useState, useEffect } from "react";
import axios from "axios";

// Definir tipos
interface Mensaje {
  mensaje: string;
  fecha?: string;
  tecnologia?: string;
}

function App() {
  const [mensaje, setMensaje] = useState<string>(
    "Conectando con el servidor..."
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const obtenerMensaje = async (): Promise<void> => {
      try {
        const respuesta = await axios.get<Mensaje>(
          "http://localhost:5000/api/test"
        );
        setMensaje(respuesta.data.mensaje);
        setError(false);
      } catch (err) {
        setMensaje("Error: No se puede conectar al servidor");
        setError(true);
        console.error("Error de conexión:", err);
      }
    };

    obtenerMensaje();
  }, []);

  return (
    <div style={estilos.contenedor}>
      <h1 style={estilos.titulo}>E-Commerce - Tienda de Ropa</h1>
      <div style={error ? estilos.errorBox : estilos.exitoBox}>
        <p style={estilos.mensaje}>{mensaje}</p>
      </div>
      <p style={estilos.info}>
        {error
          ? "Asegúrate de que el backend esté corriendo en el puerto 5000"
          : "Frontend y Backend conectados correctamente (TypeScript)"}
      </p>
    </div>
  );
}

// Tipos para estilos
interface Estilos {
  [key: string]: React.CSSProperties;
}

const estilos: Estilos = {
  contenedor: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
  },
  titulo: {
    color: "#333",
    marginBottom: "30px",
  },
  exitoBox: {
    backgroundColor: "#d4edda",
    border: "2px solid #28a745",
    borderRadius: "8px",
    padding: "20px 40px",
    marginBottom: "20px",
  },
  errorBox: {
    backgroundColor: "#f8d7da",
    border: "2px solid #dc3545",
    borderRadius: "8px",
    padding: "20px 40px",
    marginBottom: "20px",
  },
  mensaje: {
    fontSize: "20px",
    margin: 0,
    fontWeight: "bold",
  },
  info: {
    color: "#666",
    fontSize: "14px",
  },
};

export default App;
