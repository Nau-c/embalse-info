/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica para Vercel
  
  // Configuración de TypeScript - Deshabilitar completamente la verificación
  typescript: {
    // Ignorar completamente los errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },

  // Configuración de ESLint - Deshabilitar completamente la verificación  
  eslint: {
    // Ignorar completamente los errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },

  // Configuración experimental
  experimental: {
    // Optimizaciones de bundle
    optimizePackageImports: ['@anthropic-ai/sdk'],
  },
};

export default nextConfig;