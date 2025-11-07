// Componente Loading que muestra un spinner de carga y un mensaje opcional
interface LoadingProps {
  mensaje?: string;
  tamano?: "small" | "medium" | "large";
}

// Componente Loading
function Loading({ mensaje = "Cargando...", tamano = "medium" }: LoadingProps) {
  const tamanos = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  // Renderizar el componente de carga
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div
        className={`${tamanos[tamano]} border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4`}
      />

      {/* Mensaje */}
      <p className="text-gray-600 text-lg font-medium animate-pulse">
        {mensaje}
      </p>
    </div>
  );
}

export default Loading;
