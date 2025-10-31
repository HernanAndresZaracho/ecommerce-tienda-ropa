import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.config";
import { Producto, RespuestaProductos } from "../interfaces/producto.interface";

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerProductos = async (): Promise<void> => {
      try {
        setCargando(true);
        const respuesta = await axios.get<RespuestaProductos>(
          API_ENDPOINTS.productos
        );

        if (respuesta.data.success) {
          setProductos(respuesta.data.productos);
          setError(null);
        } else {
          setError("No se pudieron cargar los productos");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
        console.error("Error al obtener productos:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) {
    return (
      <div style={estilos.contenedor}>
        <div style={estilos.cargando}>
          <h2>⏳ Cargando productos...</h2>
          <p>Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={estilos.contenedor}>
        <div style={estilos.error}>
          <h2>{error}</h2>
          <p>Por favor, verifica que el backend esté corriendo</p>
        </div>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div style={estilos.contenedor}>
        <div style={estilos.sinProductos}>
          <h2>No hay productos disponibles</h2>
          <p>Vuelve más tarde</p>
        </div>
      </div>
    );
  }

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.header}>
        <h1 style={estilos.titulo}>🛍️ Catálogo de Productos</h1>
        <p style={estilos.subtitulo}>
          Mostrando {productos.length}{" "}
          {productos.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      <div style={estilos.grid}>
        {productos.map((producto) => (
          <div
            key={producto._id}
            style={estilos.tarjeta}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <div style={estilos.imagenContainer}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={estilos.imagen}
              />
              <span style={estilos.categoriaTag}>
                {producto.categoria.toUpperCase()}
              </span>
            </div>

            <div style={estilos.info}>
              <h3 style={estilos.nombreProducto}>{producto.nombre}</h3>

              <p style={estilos.descripcion}>{producto.descripcion}</p>

              <div style={estilos.precioContainer}>
                <span style={estilos.precio}>
                  ${producto.precio.toLocaleString("es-AR")}
                </span>
                <span
                  style={
                    producto.stock > 0
                      ? estilos.stockDisponible
                      : estilos.stockAgotado
                  }
                >
                  {producto.stock > 0
                    ? `✓ Stock: ${producto.stock}`
                    : "✗ Sin stock"}
                </span>
              </div>

              <div style={estilos.tallasContainer}>
                <span style={estilos.tallasLabel}>Tallas:</span>
                <div style={estilos.tallas}>
                  {producto.tallas.map((talla) => (
                    <span key={talla} style={estilos.talla}>
                      {talla}
                    </span>
                  ))}
                </div>
              </div>

              <button
                style={
                  producto.stock > 0
                    ? estilos.botonAgregar
                    : estilos.botonDeshabilitado
                }
                disabled={producto.stock === 0}
                onMouseEnter={(e) => {
                  if (producto.stock > 0)
                    e.currentTarget.style.backgroundColor = "#2980b9";
                }}
                onMouseLeave={(e) => {
                  if (producto.stock > 0)
                    e.currentTarget.style.backgroundColor = "#3498db";
                }}
              >
                {producto.stock > 0 ? "🛒 Agregar al carrito" : "Sin stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos
interface Estilos {
  [key: string]: React.CSSProperties;
}

const estilos: Estilos = {
  contenedor: {
    padding: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  titulo: {
    color: "#2c3e50",
    fontSize: "36px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#7f8c8d",
    fontSize: "18px",
  },
  cargando: {
    textAlign: "center",
    padding: "100px 20px",
    color: "#3498db",
  },
  error: {
    textAlign: "center",
    padding: "100px 20px",
    color: "#e74c3c",
  },
  sinProductos: {
    textAlign: "center",
    padding: "100px 20px",
    color: "#95a5a6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    padding: "20px 0",
  },
  tarjeta: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  imagenContainer: {
    position: "relative",
    width: "100%",
    height: "350px",
    overflow: "hidden",
  },
  imagen: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  categoriaTag: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  info: {
    padding: "20px",
  },
  nombreProducto: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "10px",
    minHeight: "50px",
  },
  descripcion: {
    fontSize: "14px",
    color: "#7f8c8d",
    lineHeight: "1.6",
    marginBottom: "15px",
    minHeight: "60px",
  },
  precioContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  precio: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#e74c3c",
  },
  stockDisponible: {
    fontSize: "13px",
    color: "#27ae60",
    fontWeight: "bold",
  },
  stockAgotado: {
    fontSize: "13px",
    color: "#e74c3c",
    fontWeight: "bold",
  },
  tallasContainer: {
    marginBottom: "15px",
  },
  tallasLabel: {
    fontSize: "13px",
    color: "#7f8c8d",
    marginRight: "8px",
  },
  tallas: {
    display: "inline-flex",
    gap: "6px",
    flexWrap: "wrap",
    marginTop: "5px",
  },
  talla: {
    backgroundColor: "#ecf0f1",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#34495e",
  },
  botonAgregar: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  botonDeshabilitado: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#bdc3c7",
    color: "#7f8c8d",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "not-allowed",
  },
};

export default Productos;
