import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Carrito,
  ItemCarrito,
  CarritoContextType,
} from "../interfaces/carrito.interface";
import { Producto } from "../interfaces/producto.interface";

// Crear el contexto
const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

// Carrito inicial vacío
const carritoInicial: Carrito = {
  items: [],
  total: 0,
  cantidadTotal: 0,
};

// Proveedor del contexto
export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Carrito>(() => {
    // Cargar carrito desde localStorage si existe
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : carritoInicial;
  });

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Función para calcular el total
  const calcularTotal = (): number => {
    return carrito.items.reduce((total, item) => {
      return total + item.producto.precio * item.cantidad;
    }, 0);
  };

  // Función para agregar producto al carrito
  const agregarAlCarrito = (
    producto: Producto,
    talla: string,
    cantidad: number = 1
  ) => {
    setCarrito((carritoActual) => {
      // Buscar si el producto con esa talla ya existe
      const itemExistente = carritoActual.items.find(
        (item) =>
          item.producto._id === producto._id && item.tallaSeleccionada === talla
      );

      let nuevosItems: ItemCarrito[];

      if (itemExistente) {
        // Si existe, aumentar la cantidad
        nuevosItems = carritoActual.items.map((item) =>
          item.producto._id === producto._id && item.tallaSeleccionada === talla
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si no existe, agregarlo
        nuevosItems = [
          ...carritoActual.items,
          {
            producto,
            cantidad,
            tallaSeleccionada: talla,
          },
        ];
      }

      // Calcular nuevo total
      const nuevoTotal = nuevosItems.reduce((total, item) => {
        return total + item.producto.precio * item.cantidad;
      }, 0);

      // Calcular cantidad total de items
      const nuevaCantidadTotal = nuevosItems.reduce((total, item) => {
        return total + item.cantidad;
      }, 0);

      return {
        items: nuevosItems,
        total: nuevoTotal,
        cantidadTotal: nuevaCantidadTotal,
      };
    });
  };

  // Función para eliminar producto del carrito
  const eliminarDelCarrito = (productoId: string, talla: string) => {
    setCarrito((carritoActual) => {
      const nuevosItems = carritoActual.items.filter(
        (item) =>
          !(
            item.producto._id === productoId && item.tallaSeleccionada === talla
          )
      );

      const nuevoTotal = nuevosItems.reduce((total, item) => {
        return total + item.producto.precio * item.cantidad;
      }, 0);

      const nuevaCantidadTotal = nuevosItems.reduce((total, item) => {
        return total + item.cantidad;
      }, 0);

      return {
        items: nuevosItems,
        total: nuevoTotal,
        cantidadTotal: nuevaCantidadTotal,
      };
    });
  };

  // Función para actualizar cantidad de un producto
  const actualizarCantidad = (
    productoId: string,
    talla: string,
    cantidad: number
  ) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId, talla);
      return;
    }

    setCarrito((carritoActual) => {
      const nuevosItems = carritoActual.items.map((item) =>
        item.producto._id === productoId && item.tallaSeleccionada === talla
          ? { ...item, cantidad }
          : item
      );

      const nuevoTotal = nuevosItems.reduce((total, item) => {
        return total + item.producto.precio * item.cantidad;
      }, 0);

      const nuevaCantidadTotal = nuevosItems.reduce((total, item) => {
        return total + item.cantidad;
      }, 0);

      return {
        items: nuevosItems,
        total: nuevoTotal,
        cantidadTotal: nuevaCantidadTotal,
      };
    });
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito(carritoInicial);
    localStorage.removeItem("carrito");
  };

  const value: CarritoContextType = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

// Hook personalizado para usar el carrito
export function useCarrito() {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error("useCarrito debe ser usado dentro de CarritoProvider");
  }
  return context;
}
