import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

interface BotonCarritoProps {
  onClick?: () => void;
}

export default function BotonCarrito({ onClick }: BotonCarritoProps) {
  const navigate = useNavigate();
  const { cantidadTotal } = useCarrito();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/carrito");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      aria-label="Carrito de compras"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {cantidadTotal > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
          {cantidadTotal}
        </span>
      )}
    </button>
  );
}
