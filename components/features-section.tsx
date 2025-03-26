"use client";

import { useState } from "react";

// Cambia el color del ícono al hacer hover.
function getIcon(name: string, isHovered: boolean) {
  // Si el usuario pasa el cursor, el ícono se vuelve rojo (#B4000A)
  const iconColor = isHovered ? "#B4000A" : "currentColor";
  switch (name) {
    case "MISION_ICON":
      return <MissionIcon className="w-12 h-12" stroke={iconColor} />;
    case "VALORES_ICON":
      return <ValuesIcon className="w-12 h-12" stroke={iconColor} />;
    case "VISION_ICON":
      return <VisionIcon className="w-12 h-12" stroke={iconColor} />;
    default:
      return null;
  }
}

interface FeatureProps {
  id: number;
  heading: string;
  subHeading: string;
  icon: string; // "MISION_ICON", "VALORES_ICON", "VISION_ICON"
}

interface FeatureSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  feature: FeatureProps[];
}

// Controla los bordes de cada columna
function getBorderClasses(index: number, total: number) {
  if (index === 0) {
    return `
      rounded-l-xl
      border-l border-t border-b border-r-0
    `;
  } else if (index === total - 1) {
    return `
      rounded-r-xl
      border-r border-t border-b border-l-0
    `;
  } else {
    return `
      border-t border-b
      border-l-0 border-r-0
    `;
  }
}

export function FeatureSection({ data }: { readonly data: FeatureSectionProps }) {
  return (
    <div className="container mx-auto px-4 py-6 md:px-35 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
        {/* Columna Izquierda */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-20">
            {data.title}
          </h2>
        </div>
        {/* Columna Derecha */}
        <div>
          <p className="text-gray-500 text-justify text-sm leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* 1 columna en móvil y 3 en pantallas medianas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {data.feature.map((feature, index) => {
          const [isHovered, setIsHovered] = useState(false);
          const totalFeatures = data.feature.length;

          return (
            <div
              key={feature.id}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                group
                pt-12 p-8
                flex flex-col
                items-start text-left
                shadow-md
                transition-all duration-300
                hover:shadow-lg hover:border-[#B4000A]
                ${index === 1 ? "bg-[#3EA6D2]/10" : "bg-white"}
                ${getBorderClasses(index, totalFeatures)}
                border-gray-200
              `}
            >
              {/* Ícono dinámico */}
              {getIcon(feature.icon, isHovered)}

              <h2 className="mt-4 mb-3 text-xl font-bold text-gray-800">
                {feature.heading}
              </h2>

              <p className="text-gray-500 text-justify text-sm leading-relaxed">
                {feature.subHeading}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Íconos representativos de cada tema */
function MissionIcon(props: any) {
  // Ícono "bandera" (flag) para Misión
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 22V2l7 3 7-3 7 3v13l-7-3-7 3-7-3Z" />
    </svg>
  );
}

function ValuesIcon(props: any) {
  // Ícono "handshake" para Valores
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 13l-3 3a2 2 0 1 0 3 3l3-3" />
      <path d="M16 13l3 3a2 2 0 1 1-3 3l-3-3" />
      <path d="M12 8a2 2 0 0 0-2 2v2h4v-2a2 2 0 0 0-2-2z" />
      <path d="M4 12v-2a4 4 0 0 1 4-4h1" />
      <path d="M20 12v-2a4 4 0 0 0-4-4h-1" />
    </svg>
  );
}

function VisionIcon(props: any) {
  // Ícono "ojo" (eye) para Visión
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M21 12c0 3.866-4.477 7-9 7S3 15.866 3 12s4.477-7 9-7 9 3.134 9 7z" />
    </svg>
  );
}
