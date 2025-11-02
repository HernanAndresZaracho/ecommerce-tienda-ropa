interface InicioProps {
  setVistaActual: (vista: "productos" | "inicio") => void;
}

function Inicio({ setVistaActual }: InicioProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-8 text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
        👋 Bienvenido a nuestra tienda
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
        Explora nuestro catálogo de productos de alta calidad. Remeras, camisas
        y pantalones para todos los estilos.
      </p>
      <button
        onClick={() => setVistaActual("productos")}
        className="px-8 sm:px-10 py-3 sm:py-4 bg-primary text-white text-lg sm:text-xl font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
      >
        🛍️ Ver Productos
      </button>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="font-bold text-lg mb-2">Envío Gratis</h3>
          <p className="text-sm text-gray-600">
            En compras superiores a $15.000
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-3">💳</div>
          <h3 className="font-bold text-lg mb-2">Pago Seguro</h3>
          <p className="text-sm text-gray-600">Múltiples métodos de pago</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-3">🔄</div>
          <h3 className="font-bold text-lg mb-2">Cambios Gratis</h3>
          <p className="text-sm text-gray-600">30 días para cambios</p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
