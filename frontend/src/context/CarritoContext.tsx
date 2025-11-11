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

// Definición del contexto y su tipo
interface CarritoContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (
    producto: Producto,
    talla: string,
    cantidad: number
  ) => void;
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

// Crear el contexto
const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useCarrito = () => {
  // Obtener el contexto
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};

// Componente proveedor del contexto
interface CarritoProviderProps {
  children: ReactNode;
}

// Lógica para manejar el carrito de compras
export const CarritoProvider = ({ children }: CarritoProviderProps) => {
  // Estado del carrito
  const [items, setItems] = useState<ItemCarrito[]>([]);
  // Obtener usuario autenticado
  const { usuario } = useAuth();

  // Cargar carrito del localStorage al iniciar (según usuario)
  useEffect(() => {
    // Determinar la clave del carrito según si hay usuario o no
    const carritoKey = usuario ? `carrito_${usuario.id}` : "carrito";
    // Cargar carrito guardado
    const carritoGuardado = localStorage.getItem(carritoKey);

    // Si hay carrito guardado, cargarlo en el estado
    if (carritoGuardado) {
      // Intentar parsear el JSON
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
      // Obtener carrito guardado del usuario y del invitado
      const carritoGuardado = localStorage.getItem(carritoUsuarioKey);
      // Obtener carrito de invitado
      const carritoInvitado = localStorage.getItem("carrito");

      if (carritoGuardado) {
        try {
          const itemsUsuario = JSON.parse(carritoGuardado);

          // Si hay carrito de invitado, combinarlo
          if (carritoInvitado && items.length > 0) {
            // Combinar: agregar productos de invitado que no estén en el carrito del usuario
            const itemsCombinados = [...itemsUsuario];

            // Parsear carrito de invitado
            items.forEach((itemInvitado) => {
              const existe = itemsUsuario.find(
                (itemUsuario: ItemCarrito) =>
                  itemUsuario.producto._id === itemInvitado.producto._id &&
                  itemUsuario.talla === itemInvitado.talla
              );

              // Si no existe, agregarlo
              if (!existe) {
                itemsCombinados.push(itemInvitado);
              } else {
                // Si existe, sumar cantidades
                const index = itemsCombinados.findIndex(
                  (item: ItemCarrito) =>
                    item.producto._id === itemInvitado.producto._id &&
                    item.talla === itemInvitado.talla
                );
                itemsCombinados[index].cantidad += itemInvitado.cantidad;
              }
            });

            // Actualizar estado y guardar carrito combinado
            setItems(itemsCombinados);
            localStorage.setItem(
              carritoUsuarioKey,
              JSON.stringify(itemsCombinados)
            );
            localStorage.removeItem("carrito");
          } else {
            setItems(itemsUsuario);
          }
        } catch (error) {
          console.error("Error al cargar carrito del usuario:", error);
        }
      } else if (carritoInvitado && items.length > 0) {
        // No tiene carrito guardado, usar el de invitado
        localStorage.setItem(carritoUsuarioKey, JSON.stringify(items));
        // Limpiar carrito de invitado
        localStorage.removeItem("carrito");
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

  // Funciones para manipular el carrito
  const agregarAlCarrito = (
    producto: Producto,
    talla: string,
    cantidad: number
  ) => {
    // Validar que la cantidad sea un número positivo
    setItems((prevItems) => {
      // Verificar si el producto con la misma talla ya está en el carrito
      const itemExistente = prevItems.find(
        (item) => item.producto._id === producto._id && item.talla === talla
      );

      // Si existe, actualizar la cantidad
      if (itemExistente) {
        // Actualizar la cantidad del item existente
        return prevItems.map((item) =>
          // Si es el mismo producto y talla, actualizar cantidad
          item.producto._id === producto._id && item.talla === talla
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      // Si no existe, agregar nuevo item al carrito
      return [...prevItems, { producto, talla, cantidad }];
    });
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (productoId: string, talla: string) => {
    // Filtrar el item a eliminar
    setItems((prevItems) =>
      // Mantener solo los items que no coincidan con el productoId y talla dados
      prevItems.filter(
        (item) => !(item.producto._id === productoId && item.talla === talla)
      )
    );
  };

  // Actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = (
    productoId: string,
    talla: string,
    cantidad: number
  ) => {
    // Si la cantidad es menor o igual a 0, eliminar el item
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId, talla);
      return;
    }

    // Actualizar la cantidad del item correspondiente
    setItems((prevItems) =>
      // Mapear los items y actualizar la cantidad del que coincide
      prevItems.map((item) =>
        // Si es el mismo producto y talla, actualizar cantidad
        item.producto._id === productoId && item.talla === talla
          ? { ...item, cantidad }
          : item
      )
    );
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setItems([]);
  };

  // Calcular el total del carrito
  const calcularTotal = () => {
    return items.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  };

  // Calcular la cantidad total de items en el carrito
  const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0);

  // Valor del contexto
  const value = {
    items,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal,
    cantidadTotal,
  };

  // Proveer el contexto a los componentes hijos
  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};
