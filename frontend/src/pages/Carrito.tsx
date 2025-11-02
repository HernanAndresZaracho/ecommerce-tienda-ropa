import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

export default function Carrito() {
  const navigate = useNavigate();
  const {
    items,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal,
  } = useCarrito();

  const handleVaciarCarrito = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      vaciarCarrito();
    }
  };

  const total = calcularTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8">
              ¡Agrega productos increíbles a tu carrito!
            </p>
            <button
              onClick={() => navigate("/productos")}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Carrito de Compras
          </h1>
          <button
            onClick={handleVaciarCarrito}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.producto._id}-${item.talla}`}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex gap-6">
                  {/* Imagen del producto */}
                  <img
                    src={item.producto.imagen}
                    alt={item.producto.nombre}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Información del producto */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.producto.nombre}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Talla: <span className="font-medium">{item.talla}</span>
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${item.producto.precio}
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() =>
                        eliminarDelCarrito(item.producto._id, item.talla)
                      }
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      ✕ Eliminar
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          actualizarCantidad(
                            item.producto._id,
                            item.talla,
                            item.cantidad - 1
                          )
                        }
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() =>
                          actualizarCantidad(
                            item.producto._id,
                            item.talla,
                            item.cantidad + 1
                          )
                        }
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
              >
                Proceder al Pago
              </button>

              <button
                onClick={() => navigate("/productos")}
                className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
