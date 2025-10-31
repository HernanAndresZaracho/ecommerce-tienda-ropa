import { CiLinkedin, CiInstagram, CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white text-center py-6 mt-auto">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">
        {/* Logo */}

        {/* Redes sociales */}
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

        {/* Texto legal */}
        <p className="text-sm text-white/70 font-semibold">
          © {new Date().getFullYear()} Tienda de Ropa - E-commerce Base
        </p>
      </div>
    </footer>
  );
};

export default Footer;
