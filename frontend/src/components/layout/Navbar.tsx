import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { estaAutenticado, usuario, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout();
    }
  };

  return (
    // Barra de navegación principal
    <nav className="bg-linear-to-r from-slate-900 to-slate-800 text-white shadow-lg sticky top-0 z-50">
      {/* Contenedor principal */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - IZQUIERDA */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-400 transition"
          >
            TiendaOnline
          </Link>

          {/* Links de navegación - DERECHA */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Enlaces de navegación */}
            <Link to="/" className="hover:text-blue-400 transition font-medium">
              Inicio
            </Link>
            {/* Enlace a la página de productos */}
            <Link
              to="/productos"
              className="hover:text-blue-400 transition font-medium"
            >
              Productos
            </Link>

            {/* Menú de usuario */}
            {estaAutenticado ? (
              <div className="flex items-center space-x-4">
                {/* Enlace a la página de pedidos */}
                <Link
                  to="/mis-pedidos"
                  className="hover:text-blue-400 transition font-medium"
                >
                  📦 Mis Pedidos
                </Link>
                {/* Saludo al usuario */}
                <span className="text-sm text-gray-300">
                  Hola, <span className="font-semibold">{usuario?.nombre}</span>
                </span>
                {/* Botón de cerrar sesión */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition font-medium"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              // Opciones para usuarios no autenticados
              <div className="flex items-center space-x-3">
                {/* Enlace a la página de inicio de sesión */}
                <Link
                  to="/login"
                  className="px-4 py-2 hover:bg-slate-700 rounded-lg transition font-medium"
                >
                  Iniciar sesión
                </Link>
                {/* Enlace a la página de registro */}
                <Link
                  to="/registro"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden mt-4 pt-4 border-t border-slate-700">
          <div className="flex flex-col space-y-3">
            {/* Enlaces de navegación */}
            <Link to="/" className="hover:text-blue-400 transition font-medium">
              Inicio
            </Link>
            {/* Enlace a la página de productos */}
            <Link
              to="/productos"
              className="hover:text-blue-400 transition font-medium"
            >
              Productos
            </Link>

            {/* Saludo al usuario */}
            {estaAutenticado ? (
              <>
                <span className="text-sm text-gray-300">
                  Hola, <span className="font-semibold">{usuario?.nombre}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition font-medium text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                {/* Enlace a la página de inicio de sesión */}
                <Link
                  to="/login"
                  className="px-4 py-2 hover:bg-slate-700 rounded-lg transition font-medium"
                >
                  Iniciar sesión
                </Link>
                {/* Enlace a la página de registro */}
                <Link
                  to="/registro"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
