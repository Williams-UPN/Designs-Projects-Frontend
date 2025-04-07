import { getHomeData } from "@/lib/get-home";
import { getStrapiMedia } from "@/lib/utils";

// Función auxiliar para transformar la URL de YouTube a formato embed
function getYouTubeEmbedUrl(originalUrl: string): string {
  return originalUrl.replace("watch?v=", "embed/");
}

export async function NosotrosPage() {
  const homeData = await getHomeData();

  const servicesBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.services-section"
  );

  const featuresBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.features-section"
  );

  return (
    <>
      <ImageMainService imageMain={servicesBlock} />

      {featuresBlock ? (
        <div className="container mx-auto px-4 py-6 md:px-35 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2]">
                {featuresBlock.title}
              </h2>
            </div>
            <div>
              <p className="text-gray-500 max-w-xl text-sm md:text-base text-justify leading-relaxed">
                {featuresBlock.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center">
          No se encontraron datos para la sección "features-section".
        </div>
      )}

      {servicesBlock.mainHeading && (
        <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] mb-10 md:mb-20 text-center">
          {servicesBlock.mainHeading}
        </h2>
      )}

      {servicesBlock?.linkCompleteService?.length > 0 && (
        <div className="container mx-auto px-4 py-6 md:px-35 lg:py-12">
          {servicesBlock.linkCompleteService.map((item: any, index: number) => {
            const isEven = index % 2 === 0;

            // Tarjeta de video que ahora muestra una imagen si existe
            const videoCard = (
              <div className="flex items-center justify-center">
                <div className="w-full transition duration-300 hover:bg-[#B4000A]/10">
                  {item.imageVideos?.url ? (
                    // Si existe la imagen, la mostramos
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <img
                        src={getStrapiMedia(item.imageVideos.url) ?? ""}
                        alt={item.imageVideos.alternativeText || item.heading}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : item.videoLink?.url ? (
                    // Sino, mostramos el video
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        src={getYouTubeEmbedUrl(item.videoLink.url)}
                        title={item.videoLink.text || "Video de YouTube"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full rounded-md"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500">No se encontró el video.</p>
                  )}
                </div>
              </div>
            );

            // Tarjeta de texto (heading y subHeading)
            const textCard = (
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] mb-4">
                  {item.heading}
                </h2>
                <p className="text-gray-500 max-w-xl text-sm md:text-base text-justify leading-relaxed">
                  {item.subHeading}
                </p>
              </div>
            );

            return (
              <div
                key={item.id}
                className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              >
                {/* En dispositivos móviles (grid de 1 columna) queremos que siempre aparezca primero el texto y luego la imagen/video */}
                {isEven ? (
                  <>
                    <div className="order-1 md:order-2">{textCard}</div>
                    <div className="order-2 md:order-1">{videoCard}</div>
                  </>
                ) : (
                  <>
                    <div className="order-1">{textCard}</div>
                    <div className="order-2">{videoCard}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/** Hero Section que usa mainHeading e imageService del bloque services-section */
function ImageMainService({ imageMain }: { imageMain: any }) {
  const title = "Nosotros";
  const relativeImageUrl =
    imageMain?.imageService?.data?.attributes?.url ||
    imageMain?.imageService?.url ||
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
