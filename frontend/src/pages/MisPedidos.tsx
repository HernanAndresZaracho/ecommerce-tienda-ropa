import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../services/api.service";
//import axios from "axios";
//import { API_URL } from "../config/api.config";
import { Pedido } from "../interfaces/pedido.interface";
import Loading from "../components/ui/Loading";

export default function MisPedidos() {
  const navigate = useNavigate();
  const { estaAutenticado } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!estaAutenticado) {
      navigate("/login");
      return;
    }

    const obtenerPedidos = async () => {
      try {
        const response = await apiClient.get("/pedidos/usuario/mis-pedidos");

        console.log("✅ Pedidos obtenidos:", response.data);
        setPedidos(response.data.data);
      } catch (err: any) {
        console.error(
          "❌ Error al obtener pedidos:",
          err.response?.data || err
        );
        setError(err.response?.data?.mensaje || "Error al cargar los pedidos");
      } finally {
        setCargando(false);
      }
    };

    obtenerPedidos();
  }, [estaAutenticado, navigate]);

  const getEstadoColor = (estado: string) => {
    const colores: Record<string, string> = {
      pendiente: "bg-yellow-100 text-yellow-800",
      pagado: "bg-green-100 text-green-800",
      enviado: "bg-blue-100 text-blue-800",
      entregado: "bg-purple-100 text-purple-800",
      cancelado: "bg-red-100 text-red-800",
    };
    return colores[estado] || "bg-gray-100 text-gray-800";
  };

  if (cargando) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {pedidos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No tienes pedidos todavía
            </h2>
            <p className="text-gray-600 mb-8">
              ¡Empieza a comprar y tus pedidos aparecerán aquí!
            </p>
            <Link
              to="/productos"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map((pedido) => (
              <div
                key={pedido._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Pedido #{pedido._id.substring(0, 8)}
                    </p>
                    <p className="text-lg font-bold">
                      {new Date(pedido.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getEstadoColor(
                        pedido.estado
                      )}`}
                    >
                      {pedido.estado.charAt(0).toUpperCase() +
                        pedido.estado.slice(1)}
                    </span>
                    <p className="text-2xl font-bold text-blue-600">
                      ${pedido.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Productos */}
                  <div>
                    <h3 className="font-semibold mb-3">Productos:</h3>
                    <div className="space-y-2">
                      {pedido.items.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.nombre}</p>
                            <p className="text-xs text-gray-600">
                              Talla: {item.talla} | Cant: {item.cantidad}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dirección */}
                  <div>
                    <h3 className="font-semibold mb-3">Envío a:</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p className="font-medium">
                        {pedido.direccionEnvio.nombre}
                      </p>
                      <p>{pedido.direccionEnvio.calle}</p>
                      <p>
                        {pedido.direccionEnvio.ciudad},{" "}
                        {pedido.direccionEnvio.provincia}
                      </p>
                      <p>CP: {pedido.direccionEnvio.codigoPostal}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-end">
                  <Link
                    to={`/confirmacion/${pedido._id}`}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
