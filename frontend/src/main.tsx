import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { CarritoProvider } from "./context/CarritoContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx"; // 👈 NUEVO

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* 👈 NUEVO - AuthProvider envuelve todo */}
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
