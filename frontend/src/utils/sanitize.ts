/**
 * Sanitiza un string removiendo caracteres peligrosos
 */
export const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>]/g, "") // Remover < y >
    .replace(/javascript:/gi, "") // Remover javascript:
    .replace(/on\w+=/gi, ""); // Remover eventos onclick, onload, etc.
};

/**
 * Sanitiza un email
 */
export const sanitizeEmail = (email: string): string => {
  // Remover espacios y convertir a minúsculas
  return email.toLowerCase().trim();
};

/**
 * Valida que un string no contenga SQL injection básico
 */
export const containsSQLInjection = (str: string): boolean => {
  // Patrones comunes de SQL injection
  const sqlPatterns = [
    /(\bOR\b|\bAND\b).*=/i,
    /UNION.*SELECT/i,
    /DROP.*TABLE/i,
    /INSERT.*INTO/i,
    /DELETE.*FROM/i,
  ];
  // Verificar si alguno de los patrones coincide
  return sqlPatterns.some((pattern) => pattern.test(str));
};
