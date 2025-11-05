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
    <nav className="bg-linear-to-r from-slate-900 to-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - IZQUIERDA */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-400 transition"
          >
            🛍️ StyleStore
          </Link>

          {/* Links de navegación - DERECHA */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-400 transition font-medium">
              Inicio
            </Link>
            <Link
              to="/productos"
              className="hover:text-blue-400 transition font-medium"
            >
              Productos
            </Link>

            {/* Menú de usuario */}
            {estaAutenticado ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/mis-pedidos"
                  className="hover:text-blue-400 transition font-medium"
                >
                  📦 Mis Pedidos
                </Link>
                <span className="text-sm text-gray-300">
                  Hola, <span className="font-semibold">{usuario?.nombre}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition font-medium"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 hover:bg-slate-700 rounded-lg transition font-medium"
                >
                  Iniciar sesión
                </Link>
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
            <Link to="/" className="hover:text-blue-400 transition font-medium">
              Inicio
            </Link>
            <Link
              to="/productos"
              className="hover:text-blue-400 transition font-medium"
            >
              Productos
            </Link>

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
                <Link
                  to="/login"
                  className="px-4 py-2 hover:bg-slate-700 rounded-lg transition font-medium"
                >
                  Iniciar sesión
                </Link>
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
