"use client";

import { useState } from "react";

function getIcon(name: string, isHovered: boolean) {
  const iconColor = isHovered ? "#FFD700" : "currentColor"; // Negro por defecto, amarillo en hover
  switch (name) {
    case "FIRST_ICON":
      return <ClockIcon className="w-12 h-12" stroke={iconColor} />;
    case "SECOND_ICON":
      return <CheckIcon className="w-12 h-12" stroke={iconColor} />;
    case "THIRD_ICON":
      return <CloudIcon className="w-12 h-12" stroke={iconColor} />;
    default:
      return null;
  }
}

interface FeatureProps {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

interface FeatureSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  feature: FeatureProps[];
}

// Función para controlar qué bordes mostrar en cada columna
function getBorderClasses(index: number, total: number) {
  if (index === 0) {
    // Primera columna
    return `
      rounded-l-xl
      border-l border-t border-b border-r-0
    `;
  } else if (index === total - 1) {
    // Última columna
    return `
      rounded-r-xl
      border-r border-t border-b border-l-0
    `;
  } else {
    // Columna del medio
    return `
      border-t border-b
      border-l-0 border-r-0
    `;
  }
}

export function FeatureSection({ data }: { readonly data: FeatureSectionProps }) {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:py-24">
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
                p-6
                flex flex-col
                items-start text-left
                shadow-md
                transition-all duration-300
                hover:shadow-lg hover:border-yellow-400
                ${index === 1 ? "bg-yellow-50" : "bg-white"}
                ${getBorderClasses(index, totalFeatures)}
                border-gray-200
              `}
            >
              {/* Ícono arriba del título */}
              {getIcon(feature.icon, isHovered)}

              <h2 className="mt-4 mb-2 text-xl font-bold text-gray-800">
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

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
