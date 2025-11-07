import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { API_URL } from "../config/api.config";
import {
  Usuario,
  AuthResponse,
  LoginCredenciales,
  RegistroData,
} from "../interfaces/usuario.interface";

// Definición del contexto y su tipo
interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  login: (credenciales: LoginCredenciales) => Promise<void>;
  registro: (data: RegistroData) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  // Obtener el contexto
  const context = useContext(AuthContext);
  // Verificar que el contexto esté disponible
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Componente proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

// Componente proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario y token del localStorage al iniciar
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");

    // Si hay token y usuario guardados, actualizarlos en el estado
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));

      // Configurar axios para incluir el token en todas las peticiones
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenGuardado}`;
    }

    // Indicar que la carga ha terminado
    setCargando(false);
  }, []);

  // Función para iniciar sesión
  const login = async (credenciales: LoginCredenciales) => {
    // Realizar petición al backend
    try {
      // Llamada a la API de login
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credenciales
      );

      // Extraer token y usuario de la respuesta
      const { token: nuevoToken, usuario: nuevoUsuario } = response.data.data;

      // Guardar en localStorage
      localStorage.setItem("token", nuevoToken);
      // Guardar el usuario como string JSON
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

      // Actualizar estado
      setToken(nuevoToken);
      // Actualizar usuario
      setUsuario(nuevoUsuario);

      // Configurar axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${nuevoToken}`;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // Función para registrar un nuevo usuario
  const registro = async (data: RegistroData) => {
    // Realizar petición al backend
    try {
      // Llamada a la API de registro
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/registro`,
        data
      );

      // Extraer token y usuario de la respuesta
      const { token: nuevoToken, usuario: nuevoUsuario } = response.data.data;

      // Guardar en localStorage
      localStorage.setItem("token", nuevoToken);
      // Guardar el usuario como string JSON
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

      // Actualizar estado
      setToken(nuevoToken);
      // Actualizar usuario
      setUsuario(nuevoUsuario);

      // Configurar axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${nuevoToken}`;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    // Eliminar el usuario del localStorage
    localStorage.removeItem("usuario");

    // Limpiar estado
    setToken(null);
    // Limpiar usuario
    setUsuario(null);

    // Limpiar header de axios
    delete axios.defaults.headers.common["Authorization"];
  };

  // Determinar si el usuario está autenticado
  const estaAutenticado = !!token && !!usuario;

  // Valor del contexto
  const value = {
    usuario,
    token,
    cargando,
    login,
    registro,
    logout,
    estaAutenticado,
  };

  // Renderizar el proveedor del contexto
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
