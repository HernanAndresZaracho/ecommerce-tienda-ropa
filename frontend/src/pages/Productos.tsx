import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.config";
import { Producto, RespuestaProductos } from "../interfaces/producto.interface";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import ProductoCard from "../components/productos/ProductoCard";

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerProductos = async (): Promise<void> => {
      console.log("🔍 URL de productos:", API_ENDPOINTS.productos);

      try {
        setCargando(true);
        const respuesta = await axios.get<RespuestaProductos>(
          API_ENDPOINTS.productos
        );

        console.log("Respuesta del backend:", respuesta.data);

        if (respuesta.data.success) {
          setProductos(respuesta.data.productos);
          setError(null);
        } else {
          setError("No se pudieron cargar los productos");
        }
      } catch (err) {
        console.error("Error completo:", err);
        setError("Error al conectar con el servidor");
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Loading mensaje="Cargando productos..." tamano="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorMessage mensaje={error} />
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-gray-500">
          <h2 className="text-3xl font-bold mb-4">
            📦 No hay productos disponibles
          </h2>
          <p>Vuelve más tarde</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          🛍️ Catálogo de Productos
        </h1>
        <p className="text-xl text-gray-600">
          Mostrando {productos.length}{" "}
          {productos.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productos.map((producto) => (
          <ProductoCard key={producto._id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default Productos;
