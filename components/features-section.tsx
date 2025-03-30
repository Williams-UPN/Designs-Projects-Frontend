"use client";
import { useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Puedes ajustar el breakpoint si lo deseas
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

function getIcon(name: string, isActive: boolean) {
  // En estado normal, el ícono usa el celeste (#3EA6D2); en estado activo (touch), se vuelve rojo fuerte (#B4000A)
  const iconColor = isActive ? "#B4000A" : "#3EA6D2";
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

function getBorderClasses(index: number, total: number) {
  if (index === 0) {
    return "rounded-l-xl border-l border-t border-b border-r-0";
  } else if (index === total - 1) {
    return "rounded-r-xl border-r border-t border-b border-l-0";
  } else {
    return "border-t border-b border-l-0 border-r-0";
  }
}

// Componente para cada tarjeta de característica
function FeatureCard({
  feature,
  index,
  totalFeatures,
}: {
  feature: FeatureProps;
  index: number;
  totalFeatures: number;
}) {
  const isMobile = useIsMobile();
  const [isActive, setIsActive] = useState(false);

  // En desktop se usan los eventos hover (ya definidos en CSS) y en móvil activamos los eventos touch
  const handleTouchStart = () => {
    if (isMobile) setIsActive(true);
  };
  const handleTouchEnd = () => {
    if (isMobile) setIsActive(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // Puedes dejar los eventos de mouse para que en escritorio el hover siga funcionando
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`
        group
        pt-12 p-6
        flex flex-col items-start text-left
        ${index === 1 ? "bg-[#3EA6D2]/10" : "bg-white"}
        shadow-md hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300
        ${getBorderClasses(index, totalFeatures)}
        border border-transparent hover:border-[#B4000A]
        hover:rounded-xl
      `}
    >
      {getIcon(feature.icon, isActive)}
      <h2 className="mt-4 mb-2 text-2xl md:text-4xl font-bold text-[#3EA6D2]">
        {feature.heading}
      </h2>
      <p className="text-gray-600 text-sm text-justify leading-relaxed">
        {feature.subHeading}
      </p>
    </div>
  );
}

export function FeatureSection({ data }: { readonly data: FeatureSectionProps }) {
  return (
    <div className="container mx-auto px-4 py-6 md:px-35 lg:py-12">
      {/* Título y descripción principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center mb-12">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] mb-4 md:mb-20">
            {data.title}
          </h2>
        </div>
        <div>
          <p className="text-gray-600 text-sm text-justify leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Tarjetas de características sin separación (gap-0) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {data.feature.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
            totalFeatures={data.feature.length}
          />
        ))}
      </div>
    </div>
  );
}

/* Íconos representativos */
function MissionIcon(props: any) {
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
