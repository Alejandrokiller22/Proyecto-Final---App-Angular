/**
 * Interfaz para definir la estructura de un proyecto
 */
export interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  enlace: string;
  imagen?: string;
  tecnologias?: string[];
  fecha?: Date;
}
