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

export interface AuthResponse {
  success: boolean;
  mensaje: string;
  data: {
    token: string;
    usuario: Usuario;
  };
}

export interface LoginCredenciales {
  email: string;
  password: string;
}

export interface RegistroData {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
}
