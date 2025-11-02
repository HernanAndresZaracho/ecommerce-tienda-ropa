/**
 * Usuario autenticado
 */
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: "cliente" | "admin";
}

/**
 * Datos de registro
 */
export interface DatosRegistro {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
}

/**
 * Datos de login
 */
export interface DatosLogin {
  email: string;
  password: string;
}

/**
 * Respuesta de autenticación
 */
export interface RespuestaAuth {
  success: boolean;
  mensaje: string;
  token?: string;
  usuario?: Usuario;
}

/**
 * Context de autenticación
 */
export interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  login: (datos: DatosLogin) => Promise<void>;
  registro: (datos: DatosRegistro) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
}
