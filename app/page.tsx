import { getHomeData, getSliderData } from "@/lib/get-home";
import { MainSection } from "@/components/main-section";
import { FeatureSection } from "@/components/features-section";
import ImageSlider from "@/components/ImageSlider";

export default async function Home() {
  // Carga en paralelo
  const [strapiData, sliderData] = await Promise.all([
    getHomeData(),
    getSliderData(),
  ]);

  return (
    <main>
      <ImageSlider slides={sliderData} />
      {strapiData.blocks.map(blockRenderer)}
    </main>
  );
}

const blockComponents = {
  "layaout.main-section": MainSection,
  "layaout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}