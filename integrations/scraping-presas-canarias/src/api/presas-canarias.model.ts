/**
 * Modelo de datos para una presa de Canarias
 */
export interface PresaCanaria {
  nombre: string;
  isla: string;
  cuenca?: string;
  barranco?: string;
  cotaMuro?: number; // en metros
  altura: number; // en metros
  capacidad: number; // en m³
  volumenMaximo?: number; // en m³
  tipo?: string; // tipo de presa (mampostería, hormigón, etc.)
  municipio?: string;
  coordenadas?: {
    latitud: number;
    longitud: number;
  };
  fechaConstruccion?: string;
  estado?: string; // estado actual de la presa
  fuente: string; // URL de la fuente de datos
}

/**
 * Modelo para las presas asignadas al Consejo Insular de Aguas
 */
export interface PresaAsignadaConsejo {
  nombre: string;
  altura: number; // en metros
  volumenMaximo: number; // en m³
  isla: string;
  fuente: string;
}

/**
 * Modelo para las grandes presas de Gran Canaria
 */
export interface GranPresaGranCanaria {
  nombre: string;
  cuenca: string;
  barranco: string;
  cotaMuro: number; // en metros
  capacidad: number; // en m³
  altura: number; // en metros
  isla: string;
  fuente: string;
}

/**
 * Entidad para actualización de datos de presas
 */
export interface PresaUpdateEntity {
  id: string;
  nombre: string;
  isla: string;
  capacidad: number;
  altura: number;
  volumenActual?: number;
  porcentajeLlenado?: number;
  fechaMedida: string;
  fuente: string;
} 