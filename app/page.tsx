import { getGlobal, getHomeData, getSliderData } from "@/lib/get-home";
import { FeatureSection } from "@/components/features-section";
import { ServiceSection } from "@/components/service-section";
import ImageSlider from "@/components/ImageSlider";

export default async function Home() {
  const [globalData, strapiData, sliderData] = await Promise.all([
    getGlobal(),
    getHomeData(),
    getSliderData(),
  ]);

  const subheading = globalData?.data?.subHeading || "Texto predeterminado";

  return (
    <main>
      <ImageSlider slides={sliderData} globalSubheading={subheading} />
      {strapiData.blocks.map(blockRenderer)}
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
