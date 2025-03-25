import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FloatingSocialButtons } from "@/components/FloatingSocialButtons";
import { getHomeData, getGlobalMetadata } from "@/lib/get-home";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalMetadata();
  return {
    title: metadata?.data?.title ?? "Epic Next Course",
    description: metadata?.data?.description ?? "Epic Next Course",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homeData = await getHomeData();
  console.dir(homeData, { depth: null });

  // Extraemos el bloque correspondiente al header y al footer
  const headerBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.header"
  );
  const footerBlock = homeData.blocks.find(
    (block: any) => block.__component === "layaout.footer"
  );

  if (!headerBlock || !footerBlock) {
    throw new Error("No se han recibido datos globales");
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Header data={headerBlock} imageIco={headerBlock.imageIco} />
        {children}
        <Footer data={footerBlock} />
        {/* Agrega aquí el botón flotante */}
        <FloatingSocialButtons socialLink={footerBlock.socialLink} />
      </body>
    </html>
  );
}
