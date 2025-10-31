import { useState } from "react";

type Vista = "productos" | "inicio";

interface NavbarProps {
  vistaActual: Vista;
  setVistaActual: (vista: Vista) => void;
}

function Navbar({ vistaActual, setVistaActual }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* LOGO */}
          <h1 className="text-2xl sm:text-3xl font-bold">🛍️ Tienda de Ropa</h1>

          {/* BOTÓN HAMBURGUESA (solo móvil) */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="sm:hidden text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuAbierto ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* NAVEGACIÓN DESKTOP (oculta en móvil) */}
          <nav className="hidden sm:flex gap-4">
            <button
              onClick={() => setVistaActual("inicio")}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                vistaActual === "inicio"
                  ? "bg-white text-secondary"
                  : "border-2 border-white hover:bg-white/10"
              }`}
            >
              🏠 Inicio
            </button>
            <button
              onClick={() => setVistaActual("productos")}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                vistaActual === "productos"
                  ? "bg-white text-secondary"
                  : "border-2 border-white hover:bg-white/10"
              }`}
            >
              🛍️ Productos
            </button>
          </nav>
        </div>

        {/* MENÚ MÓVIL (desplegable) */}
        {menuAbierto && (
          <nav className="sm:hidden mt-4 flex flex-col gap-2 animate-fadeIn">
            <button
              onClick={() => {
                setVistaActual("inicio");
                setMenuAbierto(false);
              }}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 text-left ${
                vistaActual === "inicio"
                  ? "bg-white text-secondary"
                  : "border-2 border-white hover:bg-white/10"
              }`}
            >
              🏠 Inicio
            </button>
            <button
              onClick={() => {
                setVistaActual("productos");
                setMenuAbierto(false);
              }}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 text-left ${
                vistaActual === "productos"
                  ? "bg-white text-secondary"
                  : "border-2 border-white hover:bg-white/10"
              }`}
            >
              🛍️ Productos
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
