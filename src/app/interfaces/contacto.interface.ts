/**
 * Interfaz para el formulario de contacto
 */
export interface ContactoForm {
  nombre: string;
  email: string;
  mensaje?: string;
  aceptaCondiciones: boolean;
}
