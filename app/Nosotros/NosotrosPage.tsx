// app/nosotros/NosotrosPage.tsx

import { getHomeData } from "@/lib/get-home";
import { getStrapiMedia } from "@/lib/utils";

function getYouTubeEmbedUrl(originalUrl: string): string {
  console.log("Original URL:", originalUrl);
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
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                {featuresBlock.title}
              </h2>
            </div>
            <div>
              <p className="text-gray-500 text-justify text-sm leading-relaxed">
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
      {servicesBlock?.linkCompleteService?.length > 0 && (
        <div className="container mx-auto px-4 py-6 md:px-35 lg:py-12">
          {servicesBlock.linkCompleteService.map((item: any, index: number) => {
            const isEven = index % 2 === 0;
            const videoCard = (
              <div className="flex items-center justify-center">
                <div className="w-full">
                  {item.videoLink?.url ? (
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

            const textCard = (
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                  {item.heading}
                </h2>
                <p className="text-gray-500 text-justify text-sm leading-relaxed">
                  {item.subHeading}
                </p>
              </div>
            );

            return (
              <div
                key={item.id}
                className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              >
                {isEven ? (
                  <>
                    {videoCard}
                    {textCard}
                  </>
                ) : (
                  <>
                    {textCard}
                    {videoCard}
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
