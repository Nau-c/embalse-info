/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica para Vercel
  
  // Configuración de TypeScript
  typescript: {
    // Durante el build, TypeScript errors serán tratados como warnings
    ignoreBuildErrors: false,
  },

  // Configuración de ESLint
  eslint: {
    // Durante el build, ESLint errors serán tratados como warnings
    ignoreDuringBuilds: false,
  },

  // Configuración experimental
  experimental: {
    // Optimizaciones de bundle
    optimizePackageImports: ['@anthropic-ai/sdk'],
  },
};

export default nextConfig;