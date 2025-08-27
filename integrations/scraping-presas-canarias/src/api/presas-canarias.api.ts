import axios from 'axios';

/**
 * URL base del Consejo Insular de Aguas de Gran Canaria
 */
const GRAN_CANARIA_BASE_URL = 'https://www.aguasgrancanaria.com';

/**
 * Obtiene el contenido HTML de la página de presas de Gran Canaria
 * @returns El contenido HTML de la página
 */
export async function getPresasGranCanariaHTMLContent(): Promise<string> {
  try {
    const response = await axios.get(`${GRAN_CANARIA_BASE_URL}/presas/ubicacion_presas.php`, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de presas de Gran Canaria:', error);
    throw new Error('No se pudo obtener los datos de las presas de Gran Canaria');
  }
}

/**
 * Obtiene el contenido HTML de la página de presas de Tenerife (si está disponible)
 * @returns El contenido HTML de la página o null si no está disponible
 */
export async function getPresasTenerifeHTMLContent(): Promise<string | null> {
  try {
    // URL del Consejo Insular de Aguas de Tenerife (si existe)
    const response = await axios.get('https://www.aguastenerife.org/presas', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    return response.data;
  } catch (error) {
    console.warn('No se pudo obtener datos de presas de Tenerife:', error);
    return null;
  }
} 