import * as cheerio from 'cheerio';
import { getPresasGranCanariaHTMLContent } from '@/api';
import { PresaCanaria, PresaUpdateEntity } from '@/api';
import {
  extractPresasAsignadasConsejo,
  extractGrandesPresasGranCanaria,
  combinePresasData,
  extractEstadisticasGenerales
} from '@/scraper/business';
import { mapToPresaUpdateEntity, convertToCSV } from '@/scraper/mapper';

/**
 * Realiza el scraping de las presas de Canarias y retorna los datos unificados
 * @returns Array de presas canarias con datos completos
 */
export async function scrapePresasCanarias(): Promise<PresaCanaria[]> {
  try {
    console.log('🔄 Iniciando scraping de presas de Canarias...');
    
    // Obtener datos de Gran Canaria
    const htmlGranCanaria = await getPresasGranCanariaHTMLContent();
    const $: cheerio.CheerioAPI = cheerio.load(htmlGranCanaria);
    
    console.log('📊 Extrayendo datos de Gran Canaria...');
    
    // Extraer presas asignadas al consejo
    const presasAsignadas = extractPresasAsignadasConsejo($);
    console.log(`✅ Encontradas ${presasAsignadas.length} presas asignadas al consejo`);
    
    // Extraer grandes presas
    const grandesPresas = extractGrandesPresasGranCanaria($);
    console.log(`✅ Encontradas ${grandesPresas.length} grandes presas`);
    
    // Combinar datos
    const presasUnificadas = combinePresasData(presasAsignadas, grandesPresas);
    console.log(`✅ Total de presas unificadas: ${presasUnificadas.length}`);
    
    // Extraer estadísticas generales
    const estadisticas = extractEstadisticasGenerales($);
    console.log('📈 Estadísticas generales:', estadisticas);
    
    return presasUnificadas;
    
  } catch (error) {
    console.error('❌ Error durante el scraping de presas canarias:', error);
    throw error;
  }
}

/**
 * Realiza el scraping y retorna los datos en formato de entidad de actualización
 * @returns Array de entidades de actualización de presas
 */
export async function scrapePresasCanariasAsUpdateEntity(): Promise<PresaUpdateEntity[]> {
  const presas = await scrapePresasCanarias();
  const fechaMedida = new Date().toISOString();
  
  return mapToPresaUpdateEntity(presas, fechaMedida);
}

/**
 * Realiza el scraping y exporta los datos a CSV
 * @returns String con los datos en formato CSV
 */
export async function scrapePresasCanariasAsCSV(): Promise<string> {
  const presas = await scrapePresasCanarias();
  return convertToCSV(presas);
}

/**
 * Función principal que ejecuta el scraping completo y muestra un resumen
 */
export async function ejecutarScrapingCompleto(): Promise<void> {
  try {
    console.log('🚀 Iniciando scraping completo de presas de Canarias...\n');
    
    const presas = await scrapePresasCanarias();
    
    console.log('\n📋 RESUMEN DEL SCRAPING:');
    console.log('========================');
    console.log(`Total de presas encontradas: ${presas.length}`);
    
    // Agrupar por isla
    const presasPorIsla = presas.reduce((acc, presa) => {
      acc[presa.isla] = (acc[presa.isla] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\nPresas por isla:');
    Object.entries(presasPorIsla).forEach(([isla, cantidad]) => {
      console.log(`  ${isla}: ${cantidad} presas`);
    });
    
    // Mostrar las presas más grandes
    const presasOrdenadas = presas
      .sort((a, b) => b.capacidad - a.capacidad)
      .slice(0, 5);
    
    console.log('\n🏆 Top 5 presas por capacidad:');
    presasOrdenadas.forEach((presa, index) => {
      console.log(`  ${index + 1}. ${presa.nombre} (${presa.isla}): ${(presa.capacidad / 1000000).toFixed(2)} hm³`);
    });
    
    console.log('\n✅ Scraping completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error en el scraping completo:', error);
    throw error;
  }
} 