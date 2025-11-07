// Definición de interfaces relacionadas con el usuario
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: "cliente" | "admin";
  telefono?: string;
  direccion?: {
    calle: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
  };
}

// Respuesta estándar para autenticación
export interface AuthResponse {
  success: boolean;
  mensaje: string;
  data: {
    token: string;
    usuario: Usuario;
  };
}

// Credenciales para login
export interface LoginCredenciales {
  email: string;
  password: string;
}

// Datos para registro de nuevo usuario
export interface RegistroData {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
}
