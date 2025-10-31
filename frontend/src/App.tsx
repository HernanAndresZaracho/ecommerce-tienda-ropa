import { useState } from "react";
import Productos from "./pages/Productos";

type Vista = "productos" | "inicio";

function App() {
  const [vistaActual, setVistaActual] = useState<Vista>("productos");

  return (
    <div style={estilos.app}>
      {/* HEADER */}
      <header style={estilos.header}>
        <div style={estilos.headerContent}>
          <h1 style={estilos.logo}>🛍️ Tienda de Ropa</h1>
          <nav style={estilos.nav}>
            <button
              onClick={() => setVistaActual("inicio")}
              style={
                vistaActual === "inicio" ? estilos.botonActivo : estilos.boton
              }
              onMouseEnter={(e) => {
                if (vistaActual !== "inicio")
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (vistaActual !== "inicio")
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              🏠 Inicio
            </button>

            <button
              onClick={() => setVistaActual("productos")}
              style={
                vistaActual === "productos"
                  ? estilos.botonActivo
                  : estilos.boton
              }
              onMouseEnter={(e) => {
                if (vistaActual !== "productos")
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (vistaActual !== "productos")
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              🛍️ Productos
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>
        {vistaActual === "inicio" && (
          <div style={estilos.inicio}>
            <h2>👋 Bienvenido a nuestra tienda</h2>
            <p>Explora nuestro catálogo de productos de alta calidad</p>
            <button
              onClick={() => setVistaActual("productos")}
              style={estilos.botonInicio}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#2980b9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#3498db")
              }
            >
              Ver Productos
            </button>
          </div>
        )}

        {vistaActual === "productos" && <Productos />}
      </main>

      {/* FOOTER */}
      <footer style={estilos.footer}>
        <p>© 2024 Tienda de Ropa - E-commerce Base</p>
        <p style={estilos.footerTech}>TypeScript + React + MongoDB</p>
      </footer>
    </div>
  );
}

// Estilos
interface Estilos {
  [key: string]: React.CSSProperties;
}

const estilos: Estilos = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "15px 0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  boton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  botonActivo: {
    padding: "10px 20px",
    backgroundColor: "white",
    color: "#2c3e50",
    border: "2px solid white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  inicio: {
    textAlign: "center",
    padding: "100px 20px",
    minHeight: "calc(100vh - 200px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  botonInicio: {
    marginTop: "30px",
    padding: "15px 40px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  footer: {
    backgroundColor: "#34495e",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
  },
  footerTech: {
    fontSize: "12px",
    color: "#95a5a6",
    marginTop: "5px",
  },
};

export default App;
