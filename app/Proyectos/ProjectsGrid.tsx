"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectsGridProps {
  projectImages: string[];
}

export default function ProjectsGrid({ projectImages }: ProjectsGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Abre el modal y configura la imagen inicial del slider
  const openModal = (index: number) => {
    setCurrentSlide(index);
    setModalOpen(true);
  };

  // Cuando modalOpen cambia a true, inicia la animación (efecto "elevarse")
  useEffect(() => {
    if (modalOpen) {
      // Pequeño delay para que el modal ya esté montado y se inicie la animación
      const timer = setTimeout(() => setAnimateModal(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateModal(false);
    }
  }, [modalOpen]);

  // Función para cerrar el modal con animación inversa
  const closeModal = () => {
    // Inicia la animación de salida
    setAnimateModal(false);
    // Espera a que termine la transición para desmontar el modal (800ms)
    setTimeout(() => setModalOpen(false), 800);
  };

  // Avanza al siguiente slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectImages.length);
  };

  // Retrocede al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <>
      {/* Grid de imágenes */}
      <div className="grid grid-cols-3 gap-4">
        {projectImages.map((imgUrl, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image
              src={imgUrl}
              alt={`Proyecto ${index + 1}`}
              width={768}
              height={379}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Modal: se muestra cuando modalOpen es true */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-600"
          onClick={closeModal}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} // Overlay translúcido
        >
          {/* Contenedor del modal con animación de entrada/salida */}
          <div
            className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl h-[80vh] flex transition-transform duration-800"
            onClick={(e) => e.stopPropagation()} // Evita cierre al hacer clic dentro
            style={{
              transform: animateModal ? "translateY(0)" : "translateY(-100vh)",
            }}
          >
            {/* Sección de texto (lado izquierdo) */}
            <div className="w-1/2 flex flex-col items-center justify-center px-8">
              <h2 className="text-4xl font-bold mb-4">Proyectos</h2>
              <p className="text-xl text-gray-600 text-center">
                Somos especialistas en pisos industriales
              </p>
            </div>
            {/* Sección del slider (lado derecho) */}
            <div className="w-1/2 relative flex items-center justify-center">
              <button
                onClick={prevSlide}
                className="absolute left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                &lt;
              </button>
              <Image
                src={projectImages[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                width={500}
                height={400}
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              <button
                onClick={nextSlide}
                className="absolute right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                &gt;
              </button>
            </div>
            {/* Botón de cierre */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
