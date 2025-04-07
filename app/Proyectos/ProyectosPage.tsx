import { getHomeData } from "@/lib/get-home";
import { getStrapiMedia } from "@/lib/utils";
import ProjectsGrid from "./ProjectsGrid";

export async function ProyectoPage() {
  const homeData = await getHomeData();

  const servicesBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.services-section"
  );

  const projectsBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.projects"
  );

  const projectImages = (projectsBlock?.link || []).map((item: any) => ({
    heading: item.heading,
    subHeading: item.subHeading,
    imageUrl: getStrapiMedia(
      item.imageProject?.url || item.imageProject?.data?.attributes?.url
    ),
    gallery: (item.linkGallery || []).map((g: any) =>
      getStrapiMedia(
        g.sliderImageProjects?.url || g.sliderImageProjects?.data?.attributes?.url
      )
    ),
  }));

  return (
    <>
      <ImageMainService imageMain={servicesBlock} />

      <section className="container mx-auto px-4 md:px-35 py-6 md:py-12">
        {/* Título y subtítulo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] text-center">
            {projectsBlock?.heading}
          </h2>
          <p className="text-gray-500 max-w-xl text-sm md:text-base text-justify leading-relaxed">
            {projectsBlock?.subHeading}
          </p>
        </div>

        {/* Grid con tarjetas */}
        <ProjectsGrid projectImages={projectImages} />
      </section>
    </>
  );
}

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
