import { getHomeData } from "@/lib/get-home";
import { getStrapiMedia } from "@/lib/utils";
import ProjectsGrid from "./ProjectsGrid"; // Componente cliente

export async function ProyectoPage() {
  const homeData = await getHomeData();

  // Extrae el bloque de servicios que contiene imageProject
  const servicesBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.services-section"
  );

  // Arreglo de imágenes locales para el grid: 8 imágenes de ejemplo
  const projectImages = new Array(6).fill("/2.jpg");

  return (
    <>
      {/* Hero: muestra la imagen de fondo proveniente de imageProject */}
      <ImageMainService imageMain={servicesBlock} />

      {/* Sección de Proyectos */}
      <section className="container mx-auto px-35 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold">Proyectos</h1>
          <h2 className="text-2xl md:text-3xl mt-4">
            Somos especialistas en pisos industriales
          </h2>
        </header>
        {/* Grid interactivo: se delega a un componente cliente */}
        <ProjectsGrid projectImages={projectImages} />
      </section>
    </>
  );
}

/** Componente Hero */
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
