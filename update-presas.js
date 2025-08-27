#!/usr/bin/env node

/**
 * Script para actualizar automáticamente los datos de presas canarias
 * Ejecuta el scraping y actualiza el CSV cada hora
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const SCRAPING_DIR = path.join(__dirname, 'integrations', 'scraping-presas-canarias');
const FRONTEND_PUBLIC_DIR = path.join(__dirname, 'front', 'public');
const CSV_SOURCE = path.join(SCRAPING_DIR, 'presas_canarias.csv');
const CSV_DEST = path.join(FRONTEND_PUBLIC_DIR, 'presas_canarias.csv');

/**
 * Ejecuta el scraping de datos
 */
async function executeScraping() {
  try {
    console.log('🔄 Iniciando actualización de datos de presas...');
    console.log('📅 Fecha:', new Date().toLocaleString('es-ES'));
    
    // Ejecutar el scraper
    console.log('🚀 Ejecutando scraping...');
    const { stdout, stderr } = await execAsync('npm run dev', { 
      cwd: SCRAPING_DIR,
      timeout: 60000 // 60 segundos timeout
    });
    
    if (stderr && !stderr.includes('WARN')) {
      console.error('⚠️  Advertencias durante el scraping:', stderr);
    }
    
    console.log('✅ Scraping completado');
    
    // Copiar datos actualizados al frontend
    console.log('📋 Copiando datos actualizados al frontend...');
    await execAsync(`cp "${CSV_SOURCE}" "${CSV_DEST}"`);
    
    console.log('✅ Datos actualizados correctamente');
    console.log('🌐 Los datos están disponibles en: http://localhost:3000');
    console.log('⏰ Próxima actualización en 1 hora\n');
    
  } catch (error) {
    console.error('❌ Error durante la actualización:', error.message);
    throw error;
  }
}

/**
 * Programa las actualizaciones cada hora
 */
function scheduleUpdates() {
  console.log('🕐 Configurando actualizaciones automáticas cada hora...');
  console.log('⏰ Primera actualización en proceso...\n');
  
  // Ejecutar inmediatamente la primera vez
  executeScraping()
    .then(() => {
      // Programar ejecuciones cada hora (3600000 ms)
      setInterval(async () => {
        try {
          await executeScraping();
        } catch (error) {
          console.error('❌ Error en actualización programada:', error.message);
          console.log('⏰ Continuando con el programa de actualizaciones...\n');
        }
      }, 3600000); // 1 hora = 3600000 ms
    })
    .catch((error) => {
      console.error('❌ Error en la primera actualización:', error.message);
      process.exit(1);
    });
}

/**
 * Maneja la terminación del proceso
 */
function handleExit() {
  process.on('SIGINT', () => {
    console.log('\n🛑 Deteniendo actualizaciones automáticas...');
    console.log('👋 ¡Hasta pronto!');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Proceso terminado');
    process.exit(0);
  });
}

// Verificar que los directorios existen
import fs from 'fs';

if (!fs.existsSync(SCRAPING_DIR)) {
  console.error('❌ Directorio de scraping no encontrado:', SCRAPING_DIR);
  process.exit(1);
}

if (!fs.existsSync(FRONTEND_PUBLIC_DIR)) {
  console.error('❌ Directorio público del frontend no encontrado:', FRONTEND_PUBLIC_DIR);
  process.exit(1);
}

// Iniciar el programa
console.log('🏝️  ACTUALIZADOR AUTOMÁTICO DE PRESAS CANARIAS');
console.log('===============================================');
console.log('📊 Datos se actualizarán cada hora desde:');
console.log('🌐 https://www.aguasgrancanaria.com/presas/ubicacion_presas.php');
console.log('💾 CSV destino:', CSV_DEST);
console.log('');

handleExit();
scheduleUpdates();