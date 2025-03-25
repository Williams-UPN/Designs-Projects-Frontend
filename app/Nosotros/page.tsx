import { getHomeData } from "@/lib/get-home";
import { ServiceSection } from "@/components/service-section";

export default async function NosotrosPage() {
  // Obtenemos todos los bloques de la home
  const homeData = await getHomeData();

  // Filtramos el bloque con __component === "layaout.services-section"
  const servicesBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.services-section"
  );

  // Si no existe, mostramos un mensaje
  if (!servicesBlock) {
    return (
      <div className="p-4 text-center">
        No se encontraron datos para la sección "services-section".
      </div>
    );
  }

  // Renderizamos el mismo componente ServiceSection con la data filtrada
  return (
    <main>
      <ServiceSection data={servicesBlock} />
    </main>
  );
}
