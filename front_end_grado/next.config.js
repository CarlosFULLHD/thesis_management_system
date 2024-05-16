// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // Añadido para habilitar la exportación estática
  // Configuraciones opcionales, descomentar si es necesario:
  // trailingSlash: true,
  // distDir: 'dist',
};

module.exports = nextConfig;
