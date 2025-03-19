import { getHomeData } from "@/lib/get-home-data";
import { MainSection } from "@/components/main-section";

export default async function Home() {
  const { blocks } = await getHomeData();

  return (
    <main>
      <MainSection data={blocks[0]} />
      </main>
  );
}
