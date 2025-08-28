#!/usr/bin/env node

// Script personalizado de build para Vercel
// Este script instala las dependencias necesarias y ejecuta el build

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🔧 Iniciando build personalizado para Vercel...');

try {
  // Verificar si TypeScript está instalado
  if (!existsSync('node_modules/typescript')) {
    console.log('📦 Instalando TypeScript y dependencias...');
    execSync('npm install typescript @types/node @types/react @types/react-dom eslint eslint-config-next --save-dev', { stdio: 'inherit' });
  }

  // Ejecutar el build de Next.js
  console.log('🚀 Ejecutando Next.js build...');
  execSync('npx next build', { stdio: 'inherit' });

  console.log('✅ Build completado exitosamente!');
} catch (error) {
  console.error('❌ Error durante el build:', error.message);
  process.exit(1);
}
