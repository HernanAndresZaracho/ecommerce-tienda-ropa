function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Número 404 grande */}
        <h1 className="text-9xl font-bold text-primary mb-4 animate-pulse">
          404
        </h1>

        {/* Emoji grande */}
        <div className="text-8xl mb-6">😕</div>

        {/* Mensaje */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            🏠 Volver al Inicio
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            ← Volver Atrás
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
