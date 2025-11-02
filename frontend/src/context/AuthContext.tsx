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

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  login: (credenciales: LoginCredenciales) => Promise<void>;
  registro: (data: RegistroData) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario y token del localStorage al iniciar
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");

    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));

      // Configurar axios para incluir el token en todas las peticiones
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenGuardado}`;
    }

    setCargando(false);
  }, []);

  const login = async (credenciales: LoginCredenciales) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credenciales
      );

      const { token: nuevoToken, usuario: nuevoUsuario } = response.data.data;

      // Guardar en localStorage
      localStorage.setItem("token", nuevoToken);
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

      // Actualizar estado
      setToken(nuevoToken);
      setUsuario(nuevoUsuario);

      // Configurar axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${nuevoToken}`;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const registro = async (data: RegistroData) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/registro`,
        data
      );

      const { token: nuevoToken, usuario: nuevoUsuario } = response.data.data;

      // Guardar en localStorage
      localStorage.setItem("token", nuevoToken);
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

      // Actualizar estado
      setToken(nuevoToken);
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
    localStorage.removeItem("usuario");

    // Limpiar estado
    setToken(null);
    setUsuario(null);

    // Limpiar header de axios
    delete axios.defaults.headers.common["Authorization"];
  };

  const estaAutenticado = !!token && !!usuario;

  const value = {
    usuario,
    token,
    cargando,
    login,
    registro,
    logout,
    estaAutenticado,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
