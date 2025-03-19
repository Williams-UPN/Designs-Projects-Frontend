import { getHomeData } from "@/lib/get-home-data";
import { MainSection } from "@/components/main-section";

export default async function Home() {
  // Llamamos a la nueva función y recibimos el objeto transformado
  const { title, description, blocks } = await getHomeData();
  
  // Buscamos el bloque con __component = "layaout.main-section"
  const mainSectionBlock = blocks.find(
    (b: any) => b.__component === "layaout.main-section"
  );

  return (
    <main>
      {/* Encabezado con title y description */}
      <h1>{title}</h1>
      <p>{description}</p>

      {/* Renderizamos el bloque MainSection si existe */}
      {mainSectionBlock && <MainSection data={mainSectionBlock} />}
    </main>
  );
}
