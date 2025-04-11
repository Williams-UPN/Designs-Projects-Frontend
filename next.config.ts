/** @type {import('next').NextConfig} */
const nextConfig = {
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
        // Agrega este bloque para tu Strapi en Render
        protocol: "https",
        hostname: "strapi-backend-hwpl.onrender.com",
        port: "",            // deja vacío si no usas puerto explícito
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
