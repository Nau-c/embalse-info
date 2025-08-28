/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica para Vercel
  
  // Configuración de TypeScript
  typescript: {
    // Ignorar errores de TypeScript durante el build en Vercel
    ignoreBuildErrors: true,
  },

  // Configuración de ESLint
  eslint: {
    // Ignorar errores de ESLint durante el build en Vercel
    ignoreDuringBuilds: true,
  },

  // Configuración experimental
  experimental: {
    // Optimizaciones de bundle
    optimizePackageImports: ['@anthropic-ai/sdk'],
  },
};

export default nextConfig;