import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import { getGlobal, getGlobalMetadata } from "@/lib/get-home";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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

  if (!globalData?.data?.header) {
    throw new Error("No se han recibido datos para el Header");
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Header data={globalData.data.header} />
        {children}
        <Footer data={globalData.data.footer} />
      </body>
    </html>
  );
}
