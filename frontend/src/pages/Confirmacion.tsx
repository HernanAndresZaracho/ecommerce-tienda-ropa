import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api.config";
import { Pedido } from "../interfaces/pedido.interface";
import Loading from "../components/ui/Loading";

export default function Confirmacion() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [pagandoQR, setPagandoQR] = useState(false);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        const response = await axios.get(`${API_URL}/pedidos/${pedidoId}`);
        setPedido(response.data.data);
      } catch (err) {
        setError("Error al cargar el pedido");
      } finally {
        setCargando(false);
      }
    };

    if (pedidoId) {
      obtenerPedido();
    }
  }, [pedidoId]);

  const confirmarPago = async () => {
    setPagandoQR(true);
    try {
      await axios.put(`${API_URL}/pedidos/${pedidoId}/confirmar-pago`);

      // Actualizar estado del pedido
      if (pedido) {
        setPedido({ ...pedido, pagado: true, estado: "pagado" });
      }

      // Mostrar mensaje de éxito
      alert("¡Pago confirmado! Recibirás un email con los detalles.");
    } catch (err) {
      alert("Error al confirmar el pago. Intenta nuevamente.");
    } finally {
      setPagandoQR(false);
    }
  };

  if (cargando) {
    return <Loading />;
  }

  if (error || !pedido) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-3xl font-bold mb-4">Error</h2>
          <p className="text-gray-600 mb-8">
            {error || "Pedido no encontrado"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header de confirmación */}
        <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 text-center">
          <div className="text-6xl mb-4">{pedido.pagado ? "✅" : "⏳"}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {pedido.pagado ? "¡Pedido Confirmado!" : "Pedido Registrado"}
          </h1>
          <p className="text-lg text-gray-600">
            {pedido.pagado
              ? "Tu pedido ha sido confirmado y será procesado pronto."
              : "Completa el pago para confirmar tu pedido."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Nº de Pedido:{" "}
            <span className="font-mono font-bold">{pedido._id}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Información del pedido */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Detalles del Pedido</h2>

            <div className="space-y-4 mb-6">
              {pedido.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b last:border-0"
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.nombre}</p>
                    <p className="text-sm text-gray-600">
                      Talla: {item.talla} | Cantidad: {item.cantidad}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ${pedido.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="font-semibold text-green-600">
                  {pedido.costoEnvio === 0 ? "Gratis" : `$${pedido.costoEnvio}`}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ${pedido.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR de pago o confirmación */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {!pedido.pagado ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Método de Pago</h2>

                <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-6 text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-xl font-bold mb-2">Pago con QR</h3>
                  <p className="text-gray-600 mb-4">
                    Escanea el código QR con tu app de pagos
                  </p>

                  {/* QR simulado */}
                  <div className="bg-white p-6 rounded-xl inline-block mb-4">
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">QR</div>
                        <p className="text-xs text-gray-600">
                          {pedido.qrData?.substring(0, 20)}...
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    Monto:{" "}
                    <span className="font-bold text-lg">${pedido.total}</span>
                  </p>
                </div>

                <button
                  onClick={confirmarPago}
                  disabled={pagandoQR}
                  className="w-full py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:bg-green-300 disabled:cursor-not-allowed"
                >
                  {pagandoQR ? "Procesando..." : "✓ Confirmar Pago"}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  * En producción, el pago se confirmará automáticamente al
                  escanear el QR
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">¡Pago Confirmado!</h2>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">✅</div>
                    <p className="text-green-800 font-semibold">
                      Tu pago ha sido procesado exitosamente
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <span className="font-semibold text-green-600 capitalize">
                        {pedido.estado}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-semibold">
                        {new Date(pedido.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/productos"
                    className="block w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition"
                  >
                    Seguir Comprando
                  </Link>
                  <Link
                    to="/"
                    className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold text-center hover:bg-gray-200 transition"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Información de envío */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Dirección de Envío</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <p className="font-semibold">{pedido.direccionEnvio.nombre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Teléfono</p>
              <p className="font-semibold">{pedido.direccionEnvio.telefono}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{pedido.direccionEnvio.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dirección</p>
              <p className="font-semibold">
                {pedido.direccionEnvio.calle}, {pedido.direccionEnvio.ciudad},{" "}
                {pedido.direccionEnvio.provincia} (
                {pedido.direccionEnvio.codigoPostal})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
