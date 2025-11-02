import { useCarrito } from "../../context/CarritoContext";

interface BotonCarritoProps {
  onClick: () => void;
}

function BotonCarrito({ onClick }: BotonCarritoProps) {
  const { carrito } = useCarrito();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 hover:scale-110 transition-all duration-300 z-40 group"
      aria-label="Ver carrito"
    >
      {/* Icono del carrito */}
      <div className="relative">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>

        {/* Contador de items */}
        {carrito.cantidadTotal > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {carrito.cantidadTotal}
          </span>
        )}
      </div>

      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Ver carrito ({carrito.cantidadTotal}{" "}
        {carrito.cantidadTotal === 1 ? "item" : "items"})
      </span>
    </button>
  );
}

export default BotonCarrito;
