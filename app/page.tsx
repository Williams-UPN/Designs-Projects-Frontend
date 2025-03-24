import { getHomeData, getSliderData } from "@/lib/get-home";
import { FeatureSection } from "@/components/features-section";
import { ServiceSection } from "@/components/service-section";
import ImageSlider from "@/components/ImageSlider";

export default async function Home() {
  // Usamos solo getHomeData y getSliderData, ya que getGlobal ya no existe
  const [homeData, sliderData] = await Promise.all([
    getHomeData(),
    getSliderData(),
  ]);

  // Suponiendo que en tu homeData tienes el campo "subHeading" directamente (o lo obtienes desde algún bloque)
  const subheading = homeData.subHeading || "Texto predeterminado";

  return (
    <main>
      <ImageSlider slides={sliderData} globalSubheading={subheading} />
      {homeData.blocks.map(blockRenderer)}
    </main>
  );
}

const blockComponents = {
  "layaout.features-section": FeatureSection,
  "layaout.services-section": ServiceSection,
};

function blockRenderer(block: any) {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}
