import { useState } from "react";
import Productos from "./pages/Productos";

type Vista = "productos" | "inicio";

function App() {
  const [vistaActual, setVistaActual] = useState<Vista>("productos");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🛍️ Tienda de Ropa</h1>

          <nav className="flex gap-4">
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
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1">
        {vistaActual === "inicio" && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              👋 Bienvenido a nuestra tienda
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explora nuestro catálogo de productos de alta calidad
            </p>
            <button
              onClick={() => setVistaActual("productos")}
              className="px-10 py-4 bg-primary text-white text-xl font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Ver Productos
            </button>
          </div>
        )}

        {vistaActual === "productos" && <Productos />}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-700 text-white text-center py-6 mt-auto">
        <p className="font-semibold">© 2024 Tienda de Ropa - E-commerce Base</p>
        <p className="text-sm text-gray-400 mt-2">
          TypeScript + React + MongoDB + Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
