import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import { getGlobal, getGlobalMetadata } from "@/lib/get-home";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Genera los <title> y <meta> en el head
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
  // Pedimos la data global
  const globalData = await getGlobal();
  console.dir(globalData, { depth: null });

  if (!globalData?.data) {
    throw new Error("No se han recibido datos globales");
  }

  // Desestructuramos lo que nos interesa
  const { header, footer, imageIco } = globalData.data;

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        {/* Pasamos 'header' y también la 'imageIco' que está fuera de header */}
        <Header data={header} imageIco={imageIco} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}
