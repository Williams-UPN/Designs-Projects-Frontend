"use client";
import { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
// Importa tu animación (asegúrate de que la ruta sea correcta)
import triangulo from "@/public/animations/triangulo.json";
import barra from "@/public/animations/barra.json";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        {/* Primera animación */}
        <Player
          autoplay
          loop
          src={triangulo}
          className="h-70 w-70" // Ajusta el tamaño según necesites
        />
        {/* Segunda animación */}
        <Player
          autoplay
          loop
          src={barra}
          className="h-50 w-50" // Ajusta el tamaño según necesites
        />
        {/* Mensaje de error */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Algo salió mal.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Esta es una página de error. Por favor, intenta nuevamente más tarde.
        </p>
        <p className="text-pink-800 italic">{error.message}</p>
      </div>
    </div>
  );
}
