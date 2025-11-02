import { useCarrito } from "../context/CarritoContext";

interface CarritoProps {
  setVistaActual: (vista: "productos" | "inicio" | "carrito") => void;
}

function Carrito({ setVistaActual }: CarritoProps) {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito } =
    useCarrito();

  if (carrito.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icono grande */}
          <div className="text-8xl mb-6">🛒</div>

          {/* Mensaje */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            ¡Agrega productos para comenzar tu compra!
          </p>

          {/* Botón */}
          <button
            onClick={() => setVistaActual("productos")}
            className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            🛍️ Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🛒 Mi Carrito</h1>
        <p className="text-gray-600">
          {carrito.cantidadTotal}{" "}
          {carrito.cantidadTotal === 1 ? "producto" : "productos"} en tu carrito
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LISTA DE PRODUCTOS */}
        <div className="lg:col-span-2 space-y-4">
          {carrito.items.map((item) => (
            <div
              key={`${item.producto._id}-${item.tallaSeleccionada}`}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex gap-6">
                {/* IMAGEN */}
                <img
                  src={item.producto.imagen}
                  alt={item.producto.nombre}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* INFORMACIÓN */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {item.producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Talla:{" "}
                    <span className="font-bold">{item.tallaSeleccionada}</span>
                  </p>
                  <p className="text-xl font-bold text-accent">
                    ${item.producto.precio.toLocaleString("es-AR")}
                  </p>
                </div>

                {/* CONTROLES */}
                <div className="flex flex-col justify-between items-end">
                  {/* Botón eliminar */}
                  <button
                    onClick={() =>
                      eliminarDelCarrito(
                        item.producto._id,
                        item.tallaSeleccionada
                      )
                    }
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Eliminar"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  {/* Selector de cantidad */}
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                    <button
                      onClick={() =>
                        actualizarCantidad(
                          item.producto._id,
                          item.tallaSeleccionada,
                          item.cantidad - 1
                        )
                      }
                      className="text-gray-600 hover:text-gray-800 font-bold text-xl"
                    >
                      −
                    </button>
                    <span className="font-bold text-lg w-8 text-center">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() =>
                        actualizarCantidad(
                          item.producto._id,
                          item.tallaSeleccionada,
                          item.cantidad + 1
                        )
                      }
                      className="text-gray-600 hover:text-gray-800 font-bold text-xl"
                      disabled={item.cantidad >= item.producto.stock}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-lg font-bold text-gray-800">
                    $
                    {(item.producto.precio * item.cantidad).toLocaleString(
                      "es-AR"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Botón vaciar carrito */}
          <button
            onClick={vaciarCarrito}
            className="w-full py-3 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-50 transition-colors duration-300"
          >
            🗑️ Vaciar Carrito
          </button>
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Resumen del Pedido
            </h2>

            {/* Desglose */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  ${carrito.total.toLocaleString("es-AR")}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío:</span>
                <span className="font-semibold text-success">Gratis</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-accent">
                  ${carrito.total.toLocaleString("es-AR")}
                </span>
              </div>
            </div>

            {/* Botones */}
            <button className="w-full py-4 bg-success text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl mb-3">
              💳 Proceder al Pago
            </button>

            <button
              onClick={() => setVistaActual("productos")}
              className="w-full py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              ← Seguir Comprando
            </button>

            {/* Info adicional */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Envío gratis en compras +$15.000</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Pago seguro garantizado</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>30 días para cambios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
