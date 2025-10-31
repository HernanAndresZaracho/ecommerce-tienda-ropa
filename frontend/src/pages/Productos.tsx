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

  // ESTADO: CARGANDO
  if (cargando) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-blue-600">
          <h2 className="text-3xl font-bold mb-4">⏳ Cargando productos...</h2>
          <p className="text-gray-600">Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  // ESTADO: ERROR
  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-red-600">
          <h2 className="text-3xl font-bold mb-4">❌ {error}</h2>
          <p className="text-gray-600">
            Por favor, verifica que el backend esté corriendo
          </p>
        </div>
      </div>
    );
  }

  // ESTADO: SIN PRODUCTOS
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

  // ESTADO: PRODUCTOS CARGADOS
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          🛍️ Catálogo de Productos pepe
        </h1>
        <p className="text-xl text-gray-600">
          Mostrando {productos.length}{" "}
          {productos.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productos.map((producto) => (
          <div
            key={producto._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
          >
            {/* IMAGEN CON EFECTO ZOOM */}
            <div className="relative h-80 overflow-hidden bg-gray-100">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold uppercase backdrop-blur-sm">
                {producto.categoria}
              </span>

              {/* OVERLAY EN HOVER */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            </div>

            {/* INFORMACIÓN DEL PRODUCTO */}
            <div className="p-6">
              {/* NOMBRE */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 h-14 line-clamp-2">
                {producto.nombre}
              </h3>

              {/* DESCRIPCIÓN */}
              <p className="text-sm text-gray-600 mb-4 h-16 line-clamp-3">
                {producto.descripcion}
              </p>

              {/* PRECIO Y STOCK */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-accent">
                  ${producto.precio.toLocaleString("es-AR")}
                </span>
                <span
                  className={`text-sm font-bold ${
                    producto.stock > 0 ? "text-success" : "text-red-500"
                  }`}
                >
                  {producto.stock > 0
                    ? `✓ Stock: ${producto.stock}`
                    : "✗ Sin stock"}
                </span>
              </div>

              {/* TALLAS */}
              <div className="mb-4">
                <span className="text-sm text-gray-500 mr-2">Tallas:</span>
                <div className="inline-flex gap-2 flex-wrap mt-2">
                  {producto.tallas.map((talla) => (
                    <span
                      key={talla}
                      className="bg-gray-200 px-3 py-1 rounded text-sm font-bold text-gray-700"
                    >
                      {talla}
                    </span>
                  ))}
                </div>
              </div>

              {/* BOTÓN AGREGAR AL CARRITO */}
              <button
                disabled={producto.stock === 0}
                className={`w-full py-3 rounded-lg font-bold transition-colors duration-300 ${
                  producto.stock > 0
                    ? "bg-primary text-white hover:bg-blue-600 active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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

export default Productos;
