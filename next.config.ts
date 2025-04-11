/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "strapi-backend-hwpl.onrender.com",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
