// page.tsx (componente servidor)
import ContactoPage from "./ContactoPage";
import { getHomeData } from "@/lib/get-home";

export default async function Page() {
  const homeData = await getHomeData();
  const footerData = homeData.blocks.find(
    (block: any) => block.__component === "layaout.footer"
  );
  return <ContactoPage data={footerData || {}} />;
}
