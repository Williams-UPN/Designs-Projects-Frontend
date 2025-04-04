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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        {data.mainHeading && (
          <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] mb-10 md:mb-20 text-center">
            {data.mainHeading}
          </h2>
        )}

        {/* Contenedor de tarjetas */}
        <div className="flex flex-wrap justify-center items-stretch gap-6 md:gap-13">
          {data.link?.map((service) => {
            // Obtenemos la URL de la imagen
            const rawUrl =
              service.image?.formats?.thumbnail?.url || service.image?.url;
            const finalUrl = rawUrl ? getStrapiMedia(rawUrl) : null;

            // Definimos la URL del enlace (por defecto /Nosotros)
            const linkUrl = service.url || "/Nosotros";

            return (
              <div
                key={service.id}
                tabIndex={0} // Permite foco con tabulador y en pantallas táctiles
                className="
                  w-full sm:w-1/2 lg:w-1/3 max-w-sm
                  bg-white
                  shadow-sm
                  rounded-lg
                  pt-8 md:pt-12 p-6 md:p-8
                  flex flex-col
                  border border-transparent
                  transition
                  duration-300
                  /* Estilos hover */
                  hover:border-[#3EA6D2]
                  hover:shadow-lg
                  hover:-translate-y-1
                  /* Estilos focus */
                  focus:border-[#3EA6D2]
                  focus:shadow-lg
                  focus:-translate-y-1
                  /* Estilos active */
                  active:border-[#3EA6D2]
                  active:shadow-lg
                  active:-translate-y-1
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
                <h3 className="mt-4 mb-3 text-xl font-bold text-[#3EA6D2] text-center">
                  {service.heading}
                </h3>

                {/* Descripción */}
                <p className="text-gray-500 text-justify text-sm leading-relaxed">
                  {service.subHeading}
                </p>

                {/* Botón al final (mt-auto) */}
                <div className="mt-auto pt-3">
                  <a
                    href={linkUrl}
                    target={service.isExternal && service.url ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="
                      block mx-auto text-white
                      bg-[#3EA6D2] hover:bg-[#B4000A]
                      px-6 py-2 rounded-full text-center
                      transition-colors duration-300"
                  >
                    Ver más
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
