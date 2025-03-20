import { getHomeData } from "@/lib/get-home";

import { MainSection } from "@/components/main-section";
import { FeatureSection } from "@/components/features-section";

export default async function Home() {
  const strapiData = await getHomeData();
  const { blocks } = strapiData;
  return <main>{blocks.map(blockRenderer)}</main>;
}

const blockComponents = {
  "layaout.main-section": MainSection,
  "layaout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}