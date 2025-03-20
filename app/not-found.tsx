"use client";

import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
// Importa la animación desde el directorio public
import animationData from "@/public/animations/Animation - 1742507720678.json";

export default function NotFoundRoot() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="space-y-4 text-center">
                {/* Usamos la animación local */}
                <Player
                    autoplay
                    loop
                    src={animationData}
                    className="mx-auto h-120 w-200" // Tamaño mayor
                />


                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Oops! Página en construcción
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    Parece que aún estamos trabajando en esta sección...
                </p>

                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
