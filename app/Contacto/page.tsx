// page.tsx (componente servidor)
import ContactoPage from "./ContactoPage";
import { getHomeData } from "@/lib/get-home";

export default async function Page() {
  const homeData = await getHomeData();
  
  // Extraer el bloque footer
  const footerData = homeData.blocks.find(
    (block: any) => block.__component === "layaout.footer"
  );
  
  // Extraer el bloque de servicios que contiene la imagen del Hero
  const servicesBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.services-section"
  );
  
  // Combinar ambos: usamos la data del footer y agregamos la propiedad imageContact
  const data = {
    ...footerData,
    imageContact: servicesBlock?.imageContact || null,
  };

  return <ContactoPage data={data || {}} />;
}
