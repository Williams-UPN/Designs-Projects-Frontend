// @/components/custom/main-section.tsx
import React from "react";

interface MainSectionImage {
  id: number;
  url: string;
  alternativeText?: string | null;
}

interface MainSectionLink {
  id: number;
  url: string;
  text: string;
  isExternal: boolean;
}

export interface MainSectionBlock {
  id: number;
  __component: string; // "layaout.main-section"
  Heading: string;
  subHeading: string;
  image: MainSectionImage;
  link: MainSectionLink[];
}

interface MainSectionProps {
  data: MainSectionBlock;
}

export function MainSection({ data }: MainSectionProps) {
  const baseUrl = process.env.STRAPI_HOST || "http://localhost:1337";
  // Arma la URL absoluta para la imagen
  const imageUrl = data.image ? `${baseUrl}${data.image.url}` : "/placeholder.jpg";

  return (
    <section className="relative bg-[#0f172a] text-white py-12 px-4">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={data.image.alternativeText || "No alt text"}
          className="w-full h-full object-cover"
        />
        {/* Semitransparencia */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">{data.Heading}</h1>
        <p className="text-gray-300 text-lg mb-6">{data.subHeading}</p>

        {/* Mapeamos el array link */}
        {data.link?.map((l) => (
          <a
            key={l.id}
            href={l.url}
            className="inline-flex items-center px-5 py-3 text-base font-medium text-white bg-primary-700 
                       rounded-md hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 
                       dark:focus:ring-primary-900 transition-colors mr-4"
            target={l.isExternal ? "_blank" : "_self"}
            rel={l.isExternal ? "noopener noreferrer" : ""}
          >
            {l.text}
          </a>
        ))}
      </div>
    </section>
  );
}
