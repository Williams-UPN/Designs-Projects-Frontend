import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { getGlobal } from "@/lib/get-global";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await getGlobal();

  return {
    metadataBase: new URL(process.env.STRAPI_HOST || "http://localhost:3000"),
    title: {
      template: `%s | ${globalData.siteName}`,
      default: globalData.defaultSeo.metaTitle,
    },
    description: globalData.defaultSeo.metaDescription,
    icons: {
      icon: globalData.favicon?.url
        ? `${process.env.STRAPI_HOST}${globalData.favicon.url}`
        : "/favicon.ico",
    },
    openGraph: {
      title: globalData.defaultSeo.metaTitle,
      description: globalData.defaultSeo.metaDescription,
      images: globalData.defaultSeo.shareImage?.url
        ? `${process.env.STRAPI_HOST}${globalData.defaultSeo.shareImage.url}`
        : "/og-image.jpg",
    },
    // Se ha eliminado la sección de Twitter
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalData = await getGlobal();

  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar siteName={globalData.siteName} />
        {children}
        <Footer socialLinks={globalData.socialLinks} />
      </body>
    </html>
  );
}
