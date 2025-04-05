import { getHomeData, getSliderData } from "@/lib/get-home";
import { FeatureSection } from "@/components/features-section";
import { ServiceSection } from "@/components/service-section";
import ImageSlider from "@/components/ImageSlider";

export default async function Home() {
  const [homeData, sliderData] = await Promise.all([
    getHomeData(),
    getSliderData(),
  ]);

  return (
    <main>
      <ImageSlider slides={sliderData} />
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
