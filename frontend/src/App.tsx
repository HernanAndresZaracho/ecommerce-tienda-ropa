import { useState } from "react";
import Productos from "./pages/Productos";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

type Vista = "productos" | "inicio";

function App() {
  const [vistaActual, setVistaActual] = useState<Vista>("productos");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

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
      <Footer />
    </div>
  );
}

export default App;
