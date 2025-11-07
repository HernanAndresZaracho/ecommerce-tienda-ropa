import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

// Componente BotonCarrito que muestra un botón flotante con el ícono de un carrito de compras
// y la cantidad total de productos en el carrito. Al hacer clic, navega a la página del carrito
// o ejecuta una función personalizada si se proporciona.
interface BotonCarritoProps {
  onClick?: () => void;
}

// Componente BotonCarrito
export default function BotonCarrito({ onClick }: BotonCarritoProps) {
  // Hook para la navegación
  const navigate = useNavigate();
  // Obtener la cantidad total de productos en el carrito desde el contexto
  const { cantidadTotal } = useCarrito();

  // Manejar el clic en el botón
  const handleClick = () => {
    // Si se proporciona una función onClick, ejecutarla; de lo contrario, navegar a la página del carrito
    if (onClick) {
      onClick();
    } else {
      navigate("/carrito");
    }
  };

  // Renderizar el botón del carrito
  return (
    // Botón flotante con ícono de carrito y contador de productos
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      aria-label="Carrito de compras"
    >
      {/* Ícono de carrito de compras (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Ruta del ícono del carrito de compras */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {/* Contador de productos en el carrito */}
      {cantidadTotal > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
          {cantidadTotal}
        </span>
      )}
    </button>
  );
}
