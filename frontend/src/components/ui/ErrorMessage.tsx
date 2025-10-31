interface ErrorMessageProps {
  titulo?: string;
  mensaje: string;
  mostrarBotonRecargar?: boolean;
}

function ErrorMessage({
  titulo = "❌ Error",
  mensaje,
  mostrarBotonRecargar = true,
}: ErrorMessageProps) {
  const recargarPagina = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
        {/* Icono de error */}
        <div className="text-6xl mb-4">⚠️</div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-red-600 mb-3">{titulo}</h2>

        {/* Mensaje */}
        <p className="text-gray-700 mb-6">{mensaje}</p>

        {/* Botón de recargar */}
        {mostrarBotonRecargar && (
          <button
            onClick={recargarPagina}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            🔄 Reintentar
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
