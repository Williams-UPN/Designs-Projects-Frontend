"use client";

import { useState } from "react";

// service-section.tsx

export default function ServiceSection() {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Título principal */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            NUESTROS SERVICIOS
          </h2>
  
          {/* Grid de servicios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Diseño de Planos */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Diseño de Planos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Elaboración de planos de arquitectura, estructuras y redes 
                eléctricas y sanitarias, incluyendo diseño 3D.
              </p>
            </div>
  
            {/* 2. Diseño Arquitectónico */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Diseño Arquitectónico
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Creación de planos arquitectónicos para proyectos residenciales,
                comerciales y oficinas.
              </p>
            </div>
  
            {/* 3. Diseño Estructural */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Diseño Estructural
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Planes estructurales de losas, cimientos, columnas, escaleras y
                cisternas.
              </p>
            </div>
  
            {/* 4. Instalaciones Sanitarias */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Instalaciones Sanitarias
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Diseño de distribución de agua y desagüe, adaptado a cada nivel.
              </p>
            </div>
  
            {/* 5. Instalaciones Eléctricas */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Instalaciones Eléctricas
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Plano de distribución de luminarias, tomacorrientes y otros
                elementos eléctricos.
              </p>
            </div>
  
            {/* 6. Diseño de Interiores */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Diseño de Interiores
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Diseño y planificación de espacios interiores, desde decoración
                hasta distribución funcional.
              </p>
            </div>
  
            {/* 7. Estructura Metálica */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Estructura Metálica
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Diseño y montaje de estructuras metálicas, cubiertas y techos.
              </p>
            </div>
  
            {/* 8. Habilitaciones Urbanas */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Habilitaciones Urbanas
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Desarrollo de planos y proyectos para urbanización, lotización 
                y planificación de áreas comunes.
              </p>
            </div>
  
            {/* 9. Saneamiento Físico-Legal */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Saneamiento Físico-Legal
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Asesoramiento en regulaciones legales y procedimientos como
                subdivisión de lotes y licencia de construcción.
              </p>
            </div>
  
            {/* 10. Estudio de Mecánica de Suelos */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/next.svg"
                alt="Icono de servicio"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Estudio de Mecánica de Suelos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ensayos y estudios para la evaluación de la calidad del suelo 
                y su aptitud para la construcción.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
