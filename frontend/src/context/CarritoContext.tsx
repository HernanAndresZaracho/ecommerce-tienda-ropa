import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ItemCarrito } from "../interfaces/carrito.interface";
import { Producto } from "../interfaces/producto.interface";
import { useAuth } from "./AuthContext";

interface CarritoContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (
    producto: Producto,
    talla: string,
    cantidad: number
  ) => void; // 👈
  eliminarDelCarrito: (productoId: string, talla: string) => void;
  actualizarCantidad: (
    productoId: string,
    talla: string,
    cantidad: number
  ) => void;
  vaciarCarrito: () => void;
  calcularTotal: () => number;
  cantidadTotal: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};

interface CarritoProviderProps {
  children: ReactNode;
}

export const CarritoProvider = ({ children }: CarritoProviderProps) => {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const { usuario } = useAuth();

  // Cargar carrito del localStorage al iniciar (según usuario)
  useEffect(() => {
    const carritoKey = usuario ? `carrito_${usuario.id}` : "carrito";
    const carritoGuardado = localStorage.getItem(carritoKey);

    if (carritoGuardado) {
      try {
        setItems(JSON.parse(carritoGuardado));
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      }
    }
  }, []); // Solo al montar el componente

  // Sincronizar carrito cuando el usuario cambie (login/logout)
  useEffect(() => {
    if (usuario) {
      // Usuario autenticado: cargar su carrito
      const carritoUsuarioKey = `carrito_${usuario.id}`;
      const carritoGuardado = localStorage.getItem(carritoUsuarioKey);

      if (carritoGuardado) {
        try {
          setItems(JSON.parse(carritoGuardado));
        } catch (error) {
          console.error("Error al cargar carrito del usuario:", error);
        }
      } else {
        // Si no tiene carrito guardado, usar el carrito actual (de invitado)
        // y asociarlo al usuario
        if (items.length > 0) {
          localStorage.setItem(carritoUsuarioKey, JSON.stringify(items));
        }
      }
    } else {
      // Usuario no autenticado: cargar carrito de invitado
      const carritoInvitado = localStorage.getItem("carrito");
      if (carritoInvitado) {
        try {
          setItems(JSON.parse(carritoInvitado));
        } catch (error) {
          console.error("Error al cargar carrito de invitado:", error);
        }
      }
    }
  }, [usuario]);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (usuario) {
      // Guardar con el ID del usuario
      localStorage.setItem(`carrito_${usuario.id}`, JSON.stringify(items));
    } else {
      // Guardar como invitado
      localStorage.setItem("carrito", JSON.stringify(items));
    }
  }, [items, usuario]);

  const agregarAlCarrito = (
    producto: Producto,
    talla: string,
    cantidad: number
  ) => {
    setItems((prevItems) => {
      const itemExistente = prevItems.find(
        (item) => item.producto._id === producto._id && item.talla === talla
      );

      if (itemExistente) {
        return prevItems.map((item) =>
          item.producto._id === producto._id && item.talla === talla
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...prevItems, { producto, talla, cantidad }];
    });
  };

  const eliminarDelCarrito = (productoId: string, talla: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.producto._id === productoId && item.talla === talla)
      )
    );
  };

  const actualizarCantidad = (
    productoId: string,
    talla: string,
    cantidad: number
  ) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId, talla);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.producto._id === productoId && item.talla === talla
          ? { ...item, cantidad }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const calcularTotal = () => {
    return items.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  };

  const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0);

  const value = {
    items,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal,
    cantidadTotal,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};
