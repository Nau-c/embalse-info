import { PresaCanaria, PresaUpdateEntity } from '@/api';

/**
 * Convierte los datos de presas canarias al formato de entidad de actualización
 * @param presas - Array de presas canarias
 * @param fechaMedida - Fecha de la medición
 * @returns Array de entidades de actualización
 */
export function mapToPresaUpdateEntity(
  presas: PresaCanaria[],
  fechaMedida: string = new Date().toISOString()
): PresaUpdateEntity[] {
  return presas.map((presa, index) => ({
    id: `${presa.isla}-${index + 1}`,
    nombre: presa.nombre,
    isla: presa.isla,
    capacidad: presa.capacidad,
    altura: presa.altura,
    volumenActual: presa.volumenMaximo || presa.capacidad, // Por defecto usar capacidad máxima
    porcentajeLlenado: presa.volumenMaximo ? 
      ((presa.volumenMaximo / presa.capacidad) * 100) : 100,
    fechaMedida,
    fuente: presa.fuente
  }));
}

/**
 * Genera un ID único para cada presa basado en su nombre e isla
 * @param presa - Datos de la presa
 * @returns ID único
 */
export function generatePresaId(presa: PresaCanaria): string {
  const nombreNormalizado = presa.nombre
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const islaNormalizada = presa.isla
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${islaNormalizada}-${nombreNormalizado}`;
}

/**
 * Convierte los datos a formato CSV
 * @param presas - Array de presas canarias
 * @returns String en formato CSV
 */
export function convertToCSV(presas: PresaCanaria[]): string {
  const headers = [
    'nombre',
    'isla', 
    'cuenca',
    'barranco',
    'cotaMuro',
    'altura',
    'capacidad',
    'volumenMaximo',
    'tipo',
    'municipio',
    'fuente'
  ];
  
  const csvRows = [headers.join(',')];
  
  presas.forEach(presa => {
    const row = headers.map(header => {
      const value = presa[header as keyof PresaCanaria];
      if (value === undefined || value === null) {
        return '';
      }
      // Escapar comillas en valores de texto
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    });
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
} 