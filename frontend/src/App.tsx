import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BotonCarrito from "./components/ui/BotonCarrito";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Confirmacion from "./pages/Confirmacion";
import MisPedidos from "./pages/MisPedidos";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import NotFound from "./pages/NotFound";

// Componente principal de la aplicación
function App() {
  // Estructura de la aplicación con rutas y componentes comunes
  return (
    // Contenedor principal con diseño de columna y altura mínima de pantalla
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación en la parte superior */}
      <Navbar />
      <main className="grow">
        {/* Definición de rutas para diferentes páginas */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmacion/:pedidoId" element={<Confirmacion />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BotonCarrito />
    </div>
  );
}

export default App;
