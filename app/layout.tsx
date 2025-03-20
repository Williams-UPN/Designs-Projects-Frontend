import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import { getGlobal, getGlobalMetadata } from "@/lib/get-home";
import { Footer } from "@/components/footer";
// Importa tu Header como cualquier otro componente
import { Header } from "@/components/header";

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
  const globalData = await getGlobal();
  console.dir(globalData, { depth: null });

  if (!globalData?.data) {
    throw new Error("No se han recibido datos globales");
  }

  const { header, footer, imageIco } = globalData.data;

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        {/* Renderizamos nuestro Header (Client) */}
        <Header data={header} imageIco={imageIco} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}
