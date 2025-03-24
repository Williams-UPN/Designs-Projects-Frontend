"use client";
import { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import triangulo from "@/public/animations/triangulo.json";
import barra from "@/public/animations/barra.json";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="space-y-4 text-center">
        {/* Animación 1: triangulo */}
        <Player
          autoplay
          loop
          src={triangulo}
          className="mx-auto h-40 w-40 sm:h-56 sm:w-56 md:h-70 md:w-70"
        />

        {/* Animación 2: barra */}
        <Player
          autoplay
          loop
          src={barra}
          className="mx-auto h-32 w-32 sm:h-44 sm:w-44 md:h-50 md:w-50"
        />

        {/* Mensaje de error */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Algo salió mal.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Esta es una página de error. Por favor, intenta nuevamente más tarde.
        </p>
        <p className="text-pink-800 italic text-sm sm:text-base md:text-lg">
          {error.message}
        </p>
      </div>
    </div>
  );
}
