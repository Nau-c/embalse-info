export interface Embalse {
  id: string;
  nombre: string;
  provincia: string;
  capacidad: number; // in cubic meters
  nivelActual: number; // in cubic meters
  fechaUltimoNivel: Date;
  porcentajeLlenado: number; // percentage of capacity filled
}
