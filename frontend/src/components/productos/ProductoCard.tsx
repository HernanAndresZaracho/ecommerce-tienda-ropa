import { useState } from "react";
import { Producto } from "../../interfaces/producto.interface";
import { useCarrito } from "../../context/CarritoContext";
import SelectorTalla from "./SelectorTalla";

// Props del componente
interface ProductoCardProps {
  producto: Producto;
}

// Componente ProductoCard
function ProductoCard({ producto }: ProductoCardProps) {
  // Estado y contexto
  const { agregarAlCarrito } = useCarrito();
  // Estado para la talla seleccionada y mensaje de confirmación
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(
    null
  );
  // Estado para mostrar mensaje de confirmación
  const [mostrandoMensaje, setMostrandoMensaje] = useState(false);

  // Manejar agregar al carrito
  const handleAgregarAlCarrito = () => {
    // Validar que se haya seleccionado una talla
    if (!tallaSeleccionada) {
      alert("Por favor selecciona una talla");
      return;
    }

    // Agregar al carrito
    agregarAlCarrito(producto, tallaSeleccionada, 1);

    // Mostrar mensaje de confirmación
    setMostrandoMensaje(true);
    // Ocultar mensaje después de 2 segundos
    setTimeout(() => setMostrandoMensaje(false), 2000);

    // Resetear talla seleccionada
    setTallaSeleccionada(null);
  };

  return (
    // Tarjeta del producto
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
      {/* Mensaje de confirmación */}
      {mostrandoMensaje && (
        // Mensaje superpuesto
        <div className="absolute top-4 left-4 right-4 bg-success text-white px-4 py-2 rounded-lg z-10 animate-fadeIn text-center font-bold">
          ✓ Agregado al carrito
        </div>
      )}

      {/* Imagen del producto */}
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold uppercase backdrop-blur-sm">
          {producto.categoria}
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Información del producto */}
      <div className="p-6">
        {/* Nombre del producto */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 h-14 line-clamp-2">
          {producto.nombre}
        </h3>

        {/* Descripción del producto */}
        <p className="text-sm text-gray-600 mb-4 h-16 line-clamp-3">
          {producto.descripcion}
        </p>

        {/* Precio y stock */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-accent">
            {/* Precio del producto */}$
            {producto.precio.toLocaleString("es-AR")}
          </span>
          <span
            className={`text-sm font-bold ${
              /* Indicador de stock */
              producto.stock > 0 ? "text-success" : "text-red-500"
            }`}
          >
            {/* Indicador de stock */}
            {producto.stock > 0 ? `✓ Stock: ${producto.stock}` : "✗ Sin stock"}
          </span>
        </div>

        {/* Selector de talla */}
        {producto.stock > 0 && (
          <SelectorTalla
            tallas={producto.tallas}
            tallaSeleccionada={tallaSeleccionada}
            onSeleccionar={setTallaSeleccionada}
          />
        )}

        {/* Botón agregar al carrito */}
        <button
          onClick={handleAgregarAlCarrito}
          disabled={producto.stock === 0}
          className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
            producto.stock > 0
              ? "bg-primary text-white hover:bg-blue-600 active:scale-95 shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {producto.stock > 0 ? "🛒 Agregar al carrito" : "Sin stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;
