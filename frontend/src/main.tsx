import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { CarritoProvider } from "./context/CarritoContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

// Renderizado de la aplicación con proveedores de contexto
createRoot(document.getElementById("root")!).render(
  // Uso de StrictMode para detectar problemas potenciales en la aplicación
  <StrictMode>
    {/* Configuración del enrutador y proveedores de contexto */}
    <BrowserRouter>
      {/* Proveedor de autenticación */}
      <AuthProvider>
        {" "}
        {/* Proveedor de carrito de compras */}
        <CarritoProvider>
          {/* Componente principal de la aplicación */}
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
