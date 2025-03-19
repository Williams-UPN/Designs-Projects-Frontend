import { getHomeData } from "@/lib/get-home-data";
import { MainSection } from "@/components/main-section";



export default async function Home() {
  const strapiData = await getHomeData();
  const { title, description, blocks } = strapiData.data;

  // blocks es un array de componentes, 
  // en tu caso, tal vez solo tengas "mainSection" dentro de "blocks".
  // Buscamos el componente que tenga __component = "layaout.main-section"
  const mainSectionBlock = blocks.find(
    (b: any) => b.__component === "layaout.main-section"
  );

  return (
    <main>
      {/* Encabezado con title y description si los necesitas */}
      <h1>{title}</h1>
      <p>{description}</p>

      {/* Renderizamos la sección principal si existe */}
      {mainSectionBlock && <MainSection data={mainSectionBlock} />}
    </main>
  );
}


