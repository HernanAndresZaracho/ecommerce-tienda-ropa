import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BotonCarrito from "./components/ui/BotonCarrito";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";

type Vista = "productos" | "inicio" | "carrito";

function App() {
  const [vistaActual, setVistaActual] = useState<Vista>("inicio");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      <main className="flex-1">
        {vistaActual === "inicio" && <Inicio setVistaActual={setVistaActual} />}
        {vistaActual === "productos" && <Productos />}
        {vistaActual === "carrito" && (
          <Carrito setVistaActual={setVistaActual} />
        )}
      </main>

      <Footer />

      {vistaActual !== "carrito" && (
        <BotonCarrito onClick={() => setVistaActual("carrito")} />
      )}
    </div>
  );
}

export default App;
