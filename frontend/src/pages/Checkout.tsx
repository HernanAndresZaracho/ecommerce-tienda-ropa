import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "../config/api.config";
import { DireccionEnvio } from "../interfaces/pedido.interface";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, calcularTotal, vaciarCarrito } = useCarrito();
  const { usuario, estaAutenticado } = useAuth();

  const [formData, setFormData] = useState<DireccionEnvio>({
    nombre: usuario?.nombre || "",
    telefono: usuario?.telefono || "",
    email: usuario?.email || "",
    calle: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const total = calcularTotal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      // Preparar datos del pedido
      const pedidoData = {
        direccionEnvio: formData,
        items: items.map((item) => ({
          productoId: item.producto._id,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          cantidad: item.cantidad,
          talla: item.talla,
          imagen: item.producto.imagen,
        })),
        metodoPago: "qr",
      };

      const response = await axios.post(`${API_URL}/pedidos`, pedidoData);

      if (response.data.success) {
        // Vaciar carrito
        vaciarCarrito();

        // Redirigir a página de confirmación
        navigate(`/confirmacion/${response.data.data.pedidoId}`);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.mensaje || "Error al procesar el pedido");
      } else {
        setError("Error de conexión. Intente nuevamente");
      }
    } finally {
      setCargando(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">El carrito está vacío</h2>
          <button
            onClick={() => navigate("/productos")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario de envío */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Datos de Envío</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calle y número *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.calle}
                    onChange={(e) =>
                      setFormData({ ...formData, calle: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Av. Siempre Viva 742"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ciudad}
                      onChange={(e) =>
                        setFormData({ ...formData, ciudad: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provincia *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.provincia}
                      onChange={(e) =>
                        setFormData({ ...formData, provincia: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.codigoPostal}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          codigoPostal: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {!estaAutenticado && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Consejo:</strong>{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/registro")}
                        className="underline hover:text-yellow-900"
                      >
                        Crea una cuenta
                      </button>{" "}
                      para guardar tu historial de pedidos y agilizar futuras
                      compras.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {cargando ? "Procesando..." : "Continuar al Pago"}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.producto._id}-${item.talla}`}
                    className="flex gap-3"
                  >
                    <img
                      src={item.producto.imagen}
                      alt={item.producto.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {item.producto.nombre}
                      </p>
                      <p className="text-xs text-gray-600">
                        Talla: {item.talla} | Cant: {item.cantidad}
                      </p>
                      <p className="text-sm font-bold text-blue-600">
                        ${item.producto.precio * item.cantidad}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
