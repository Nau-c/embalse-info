import * as cheerio from 'cheerio';
import { AnyNode } from 'domhandler';
import { 
  PresaAsignadaConsejo, 
  GranPresaGranCanaria, 
  PresaCanaria 
} from '@/api';

/**
 * Extrae las presas asignadas al Consejo Insular de Aguas de Gran Canaria
 * @param $ - Instancia de Cheerio
 * @returns Array de presas asignadas al consejo
 */
export function extractPresasAsignadasConsejo($: cheerio.CheerioAPI): PresaAsignadaConsejo[] {
  const presas: PresaAsignadaConsejo[] = [];
  
  // Buscar la tabla "PRESAS ASIGNADAS AL Consejo"
  $('table').each((_, table) => {
    const $table = $(table);
    const tableText = $table.text();
    
    if (tableText.includes('PRESAS ASIGNADAS AL Consejo')) {
      $table.find('tr').each((_, row) => {
        const $row = $(row);
        const cells = $row.find('td');
        
        if (cells.length >= 3) {
          const nombre = $(cells[0]).text().trim();
          const alturaText = $(cells[1]).text().trim();
          const volumenText = $(cells[2]).text().trim();
          
          // Filtrar filas de totales y encabezados
          if (nombre && 
              nombre !== 'PRESA' && 
              nombre !== 'TOTALES' && 
              !nombre.includes('*') &&
              alturaText && 
              volumenText) {
            
            const altura = parseFloat(alturaText);
            const volumen = parseFloat(volumenText.replace(/\./g, ''));
            
            if (!isNaN(altura) && !isNaN(volumen)) {
              presas.push({
                nombre,
                altura,
                volumenMaximo: volumen,
                isla: 'Gran Canaria',
                fuente: 'https://www.aguasgrancanaria.com/presas/ubicacion_presas.php'
              });
            }
          }
        }
      });
    }
  });
  
  return presas;
}

/**
 * Extrae las grandes presas de Gran Canaria
 * @param $ - Instancia de Cheerio
 * @returns Array de grandes presas
 */
export function extractGrandesPresasGranCanaria($: cheerio.CheerioAPI): GranPresaGranCanaria[] {
  const presas: GranPresaGranCanaria[] = [];
  
  // Buscar la tabla "RELACIÓN DE GRANDES PRESAS"
  $('table').each((_, table) => {
    const $table = $(table);
    const tableText = $table.text();
    
    if (tableText.includes('RELACIÓN DE GRANDES PRESAS')) {
      $table.find('tr').each((_, row) => {
        const $row = $(row);
        const cells = $row.find('td');
        
        if (cells.length >= 6) {
          const nombre = $(cells[0]).text().trim();
          const cuenca = $(cells[1]).text().trim();
          const barranco = $(cells[2]).text().trim();
          const cotaMuroText = $(cells[3]).text().trim();
          const capacidadText = $(cells[4]).text().trim();
          const alturaText = $(cells[5]).text().trim();
          
          // Filtrar filas de encabezados y datos vacíos
          if (nombre && 
              nombre !== 'Nombre' && 
              cuenca && 
              barranco && 
              cotaMuroText && 
              capacidadText && 
              alturaText) {
            
            const cotaMuro = parseFloat(cotaMuroText);
            const capacidad = parseFloat(capacidadText.replace(/\./g, ''));
            const altura = parseFloat(alturaText);
            
            if (!isNaN(cotaMuro) && !isNaN(capacidad) && !isNaN(altura)) {
              presas.push({
                nombre,
                cuenca,
                barranco,
                cotaMuro,
                capacidad,
                altura,
                isla: 'Gran Canaria',
                fuente: 'https://www.aguasgrancanaria.com/presas/ubicacion_presas.php'
              });
            }
          }
        }
      });
    }
  });
  
  return presas;
}

/**
 * Combina los datos de presas asignadas y grandes presas en un formato unificado
 * @param presasAsignadas - Presas asignadas al consejo
 * @param grandesPresas - Grandes presas de Gran Canaria
 * @returns Array unificado de presas canarias
 */
export function combinePresasData(
  presasAsignadas: PresaAsignadaConsejo[],
  grandesPresas: GranPresaGranCanaria[]
): PresaCanaria[] {
  const presasUnificadas: PresaCanaria[] = [];
  
  // Agregar presas asignadas al consejo
  presasAsignadas.forEach(presa => {
    presasUnificadas.push({
      nombre: presa.nombre,
      isla: presa.isla,
      altura: presa.altura,
      capacidad: presa.volumenMaximo,
      volumenMaximo: presa.volumenMaximo,
      fuente: presa.fuente
    });
  });
  
  // Agregar grandes presas, evitando duplicados
  grandesPresas.forEach(presa => {
    const existe = presasUnificadas.find(p => p.nombre === presa.nombre);
    if (!existe) {
      presasUnificadas.push({
        nombre: presa.nombre,
        isla: presa.isla,
        cuenca: presa.cuenca,
        barranco: presa.barranco,
        cotaMuro: presa.cotaMuro,
        altura: presa.altura,
        capacidad: presa.capacidad,
        fuente: presa.fuente
      });
    } else {
      // Actualizar datos faltantes si ya existe
      const index = presasUnificadas.findIndex(p => p.nombre === presa.nombre);
      if (index !== -1) {
        presasUnificadas[index] = {
          ...presasUnificadas[index],
          cuenca: presa.cuenca,
          barranco: presa.barranco,
          cotaMuro: presa.cotaMuro
        };
      }
    }
  });
  
  return presasUnificadas;
}

/**
 * Extrae información adicional de la página (estadísticas generales)
 * @param $ - Instancia de Cheerio
 * @returns Objeto con estadísticas generales
 */
export function extractEstadisticasGenerales($: cheerio.CheerioAPI) {
  const estadisticas: any = {};
  
  // Buscar información sobre capacidad total
  const text = $.text();
  
  // Extraer capacidad total de almacenamiento
  const capacidadMatch = text.match(/almacenar\s+([\d,]+)\s+hm³/);
  if (capacidadMatch) {
    estadisticas.capacidadTotal = parseFloat(capacidadMatch[1].replace(',', '.'));
  }
  
  // Extraer número total de presas
  const presasMatch = text.match(/(\d+)\s+[""]grandes presas[""]/);
  if (presasMatch) {
    estadisticas.numeroTotalPresas = parseInt(presasMatch[1]);
  }
  
  return estadisticas;
} 