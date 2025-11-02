import { useState } from "react";
import { useCarrito } from "../../context/CarritoContext";

type Vista = "productos" | "inicio" | "carrito";

interface NavbarProps {
  vistaActual: Vista;
  setVistaActual: (vista: Vista) => void;
}

function Navbar({ vistaActual, setVistaActual }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { carrito } = useCarrito();

  return (
    <header className="bg-linear-to-r from-secondary via-gray-800 to-secondary text-white sticky top-0 z-50 shadow-xl border-b-2 border-primary/30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🛍️</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Tienda de Ropa
            </h1>
          </div>

          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="sm:hidden text-white hover:text-primary transition-colors duration-300 focus:outline-none p-2 rounded-lg hover:bg-white/10"
            aria-label="Abrir menú"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuAbierto ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <nav className="hidden sm:flex gap-3 items-center">
            <button
              onClick={() => setVistaActual("inicio")}
              className={`
                px-6 py-2.5 rounded-lg font-bold transition-all duration-300 
                ${
                  vistaActual === "inicio"
                    ? "bg-white text-secondary shadow-lg scale-105"
                    : "border-2 border-white/50 hover:border-white hover:bg-white/10 hover:scale-105"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <span>🏠</span>
                <span>Inicio</span>
              </span>
            </button>
            <button
              onClick={() => setVistaActual("productos")}
              className={`
                px-6 py-2.5 rounded-lg font-bold transition-all duration-300
                ${
                  vistaActual === "productos"
                    ? "bg-white text-secondary shadow-lg scale-105"
                    : "border-2 border-white/50 hover:border-white hover:bg-white/10 hover:scale-105"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <span>🛍️</span>
                <span>Productos</span>
              </span>
            </button>

            <button
              onClick={() => setVistaActual("carrito")}
              className={`
                px-6 py-2.5 rounded-lg font-bold transition-all duration-300 relative
                ${
                  vistaActual === "carrito"
                    ? "bg-white text-secondary shadow-lg scale-105"
                    : "border-2 border-white/50 hover:border-white hover:bg-white/10 hover:scale-105"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <span>🛒</span>
                <span>Carrito</span>
                {carrito.cantidadTotal > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {carrito.cantidadTotal}
                  </span>
                )}
              </span>
            </button>
          </nav>
        </div>

        {menuAbierto && (
          <nav className="sm:hidden mt-4 flex flex-col gap-3 animate-fadeIn pb-2">
            <button
              onClick={() => {
                setVistaActual("inicio");
                setMenuAbierto(false);
              }}
              className={`
                px-6 py-3.5 rounded-lg font-bold transition-all duration-300 text-left
                ${
                  vistaActual === "inicio"
                    ? "bg-white text-secondary shadow-lg"
                    : "border-2 border-white/50 hover:border-white hover:bg-white/10"
                }
              `}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">🏠</span>
                <span>Inicio</span>
              </span>
            </button>
            <button
              onClick={() => {
                setVistaActual("productos");
                setMenuAbierto(false);
              }}
              className={`
                px-6 py-3.5 rounded-lg font-bold transition-all duration-300 text-left
                ${
                  vistaActual === "productos"
                    ? "bg-white text-secondary shadow-lg"
                    : "border-2 border-white/50 hover:border-white hover:bg-white/10"
                }
              `}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">🛍️</span>
                <span>Productos</span>
              </span>
            </button>

            <button
              onClick={() => {
                setVistaActual("carrito");
                setMenuAbierto(false);
              }}
              className={`
                px-6 py-3.5 rounded-lg font-bold transition-all duration-300 text-left relative
                ${
                  vistaActual === "carrito"
                    ? "bg-white text-secondary shadow-lg"
                    : "border-2 border-white/50 hover:border-white hover:bg-white/10"
                }
              `}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">🛒</span>
                <span>Carrito</span>
                {carrito.cantidadTotal > 0 && (
                  <span className="ml-auto bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {carrito.cantidadTotal}
                  </span>
                )}
              </span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
