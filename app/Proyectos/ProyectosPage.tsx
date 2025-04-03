import { getHomeData } from "@/lib/get-home";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

export async function ProyectoPage() {
  const homeData = await getHomeData();

  // Extrae el bloque de servicios que contiene imageProject
  const servicesBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.services-section"
  );

  // Arreglo de imágenes locales para el grid: 10 imágenes (2 filas de 5 columnas)
  const projectImages = new Array(8).fill("/2.jpg");

  return (
    <>
      {/* Hero: muestra la imagen de fondo proveniente de imageProject */}
      <ImageMainService imageMain={servicesBlock} />

      {/* Sección de Proyectos con título, subtítulo y grid de imágenes */}
      <section className="container mx-auto px-35 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold">Proyectos</h1>
          <h2 className="text-2xl md:text-3xl mt-4">
            Somos especialistas en pisos industriales
          </h2>
        </header>
        {/* Grid de 5 columnas que generará 2 filas al tener 10 elementos */}
        <div className="grid grid-cols-4 gap-4">
          {projectImages.map((imgUrl, index) => (
            <div key={index} className="relative overflow-hidden">
              <Image
                src={imgUrl}
                alt={`Proyecto ${index + 1}`}
                width={768}
                height={379}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/** Hero Section que usa imageProject del bloque services-section */
function ImageMainService({ imageMain }: { imageMain: any }) {
  const title = "Proyectos";
  const relativeImageUrl =
    imageMain?.imageProject?.data?.attributes?.url ||
    imageMain?.imageProject?.url ||
    null;
  const fullImageUrl = relativeImageUrl
    ? getStrapiMedia(relativeImageUrl)
    : "https://via.placeholder.com/1920x500";

  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center"
      style={{
        backgroundImage: `url('${fullImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#3EA6D2]/30" />
      <h1 className="text-4xl md:text-6xl text-white font-bold z-10">
        {title}
      </h1>
    </section>
  );
}
