import { CiLinkedin, CiInstagram, CiTwitter } from "react-icons/ci";

function Footer() {
  const añoActual = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 text-white mt-auto border-t-2 border-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Columna 1: Info de la tienda */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl">🛍️</span>
              </div>
              <h3 className="text-xl font-bold">Tienda de Ropa</h3>
            </div>
            <p className="text-sm text-gray-400">
              Tu tienda online de confianza para ropa de calidad
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div className="text-center">
            <h4 className="font-bold mb-3 text-primary">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                📦 Productos
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                📞 Contacto
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                ℹ️ Sobre Nosotros
              </li>
            </ul>
          </div>

          {/* Columna 3: Tecnologías */}
          <div className="text-center md:text-right">
            <h4 className="font-bold mb-3 text-primary">Tecnologías</h4>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 text-xs">
              <span className="bg-blue-600 px-3 py-1 rounded-full">
                TypeScript
              </span>
              <span className="bg-cyan-600 px-3 py-1 rounded-full">React</span>
              <span className="bg-green-600 px-3 py-1 rounded-full">
                MongoDB
              </span>
              <span className="bg-sky-500 px-3 py-1 rounded-full">
                Tailwind
              </span>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/hernan-andres-zaracho/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white/80"
              >
                <CiLinkedin size={24} />
              </a>
              <a
                href="https://x.com/hernan_zaracho"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-white/80"
              >
                <CiTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/hernan_andres_zaracho/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white/80"
              >
                <CiInstagram size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              © {añoActual} Tienda de Ropa. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500">
              Desarrollado con ❤️ por el Equipo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
