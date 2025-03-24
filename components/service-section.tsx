"use client";
import { getStrapiMedia } from "@/lib/utils";

interface ServiceLink {
  id: number;
  heading: string;
  subHeading: string;
  url: string;
  isExternal: boolean;
  image?: {
    url: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

interface ServicesSectionBlock {
  id: number;
  __component: string;
  mainHeading: string;
  link: ServiceLink[];
}

export function ServiceSection({ data }: { data: ServicesSectionBlock }) {
  return (
    <section className="bg-white py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-35">
        {/* Título principal */}
        {data.mainHeading && (
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-10 md:mb-20 text-center">
            {data.mainHeading}
          </h2>
        )}

        {/* Contenedor de tarjetas */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-13">
          {data.link?.map((service) => {
            // Obtenemos la URL de la imagen y la convertimos a absoluta
            const rawUrl =
              service.image?.formats?.thumbnail?.url || service.image?.url;
            const finalUrl = rawUrl ? getStrapiMedia(rawUrl) : null;

            return (
              <div
                key={service.id}
                className="
                  w-full sm:w-1/2 lg:w-1/3 max-w-sm 
                  bg-white shadow-md rounded-lg 
                  pt-8 md:pt-12 p-6 md:p-8
                "
              >
                {/* Imagen */}
                {finalUrl && (
                  <img
                    src={finalUrl}
                    alt={service.image?.alternativeText || service.heading}
                    className="h-32 w-auto mx-auto mb-4 object-cover"
                  />
                )}

                {/* Título */}
                <h3 className="mt-4 mb-3 text-xl font-bold text-gray-800 text-center">
                  {service.heading}
                </h3>

                {/* Descripción */}
                <p className="text-gray-500 text-sm leading-relaxed text-center">
                  {service.subHeading}
                </p>

                {/* Enlace (opcional) */}
                <a
                  href={service.url}
                  target={service.isExternal ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-500 hover:underline"
                >
                  Ver más
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
