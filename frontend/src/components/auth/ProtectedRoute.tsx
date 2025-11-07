import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../ui/Loading";

// Componente de ruta protegida que verifica la autenticación del usuario
interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Si el usuario no está autenticado, redirige a la página de inicio de sesión
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Obtener el estado de autenticación y carga desde el contexto
  const { estaAutenticado, cargando } = useAuth();

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (cargando) {
    return <Loading />;
  }

  // Si no está autenticado, redirigir a la página de inicio de sesión
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar los componentes hijos
  return <>{children}</>;
}
