import { Talla } from "../../interfaces/producto.interface";

// Props del componente SelectorTalla
interface SelectorTallaProps {
  tallas: Talla[];
  tallaSeleccionada: string | null;
  onSeleccionar: (talla: string) => void;
}

// Componente SelectorTalla
function SelectorTalla({
  tallas,
  tallaSeleccionada,
  onSeleccionar,
}: SelectorTallaProps) {
  // Renderizado del componente
  return (
    // Contenedor principal
    <div className="mb-4">
      {/* Etiqueta del selector de talla */}
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Selecciona tu talla:
      </label>
      {/* Botones de tallas */}
      <div className="flex gap-2 flex-wrap">
        {tallas.map((talla) => (
          <button
            key={talla}
            onClick={() => onSeleccionar(talla)}
            className={`
              px-4 py-2 rounded-lg font-bold transition-all duration-300
              ${
                tallaSeleccionada === talla
                  ? "bg-primary text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
              }
            `}
          >
            {talla}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectorTalla;
