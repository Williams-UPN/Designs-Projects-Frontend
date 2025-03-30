"use client";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { inter } from "@/config/fonts";
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

interface GlobalImageIco {
  id?: number;
  url: string;
  alternativeText?: string;
}

interface SocialLink {
  id: number;
  text: string;
  url: string;
  isExternal?: boolean;
}

interface FooterProps {
  data: {
    text: string;
    socialLink?: SocialLink[];
    address?: string;
    linkAddress?: string;
  };
  imageIco?: GlobalImageIco;
}

export function Footer({ data, imageIco }: Readonly<FooterProps>) {
  if (!data) {
    console.error("No se han recibido datos para el Footer");
    return null;
  }

  const { text, socialLink, address, linkAddress } = data;

  const instagram = socialLink?.find((link) =>
    link.text.toLowerCase().includes("instagram") ||
    link.url.toLowerCase().includes("instagram")
  );
  const whatsapp = socialLink?.find((link) =>
    link.text.toLowerCase().includes("whatsapp") ||
    link.url.toLowerCase().includes("whatsapp") ||
    link.url.toLowerCase().includes("wa.me")
  );

  // Extraer solo los últimos 9 dígitos del número de teléfono en el link de WhatsApp
  let lastNineDigits = "";
  if (whatsapp) {
    const onlyDigits = whatsapp.url.replace(/\D+/g, "");
    lastNineDigits = onlyDigits.slice(-9);
  }

  return (
    <footer className={`${inter.className} bg-[#3EA6D2]/55 text-base text-white`}>
      <div className="container mx-auto px-6 md:px-40 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Columna Izquierda: Logo e Instagram */}
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <Logo dark text="" image={imageIco} />
            {instagram && (
              <div className="flex items-center space-x-2">
                <Link
                  href={instagram.url}
                  target={instagram.isExternal ? "_blank" : "_self"}
                  rel={instagram.isExternal ? "noopener noreferrer" : undefined}
                  className="
                    flex items-center space-x-2
                    text-white
                    hover:text-[#B4000A]
                    transition-colors
                  "
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Seguir en Instagram</span>
                </Link>
              </div>
            )}
          </div>

          {/* Columna Derecha: Dirección y WhatsApp */}
          <div className="mt-6 md:mt-0 flex flex-col items-start space-y-6">
            {address && linkAddress && (
              <Link
                href={linkAddress}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center space-x-2
                  text-white
                  hover:text-[#B4000A]
                  transition-colors
                "
              >
                <FaMapMarkerAlt className="w-5 h-5" />
                <span className="text-left">{address}</span>
              </Link>
            )}

            {whatsapp && lastNineDigits && (
              <div className="flex items-center space-x-2">
                <Link
                  href={whatsapp.url}
                  target={whatsapp.isExternal ? "_blank" : "_self"}
                  rel={whatsapp.isExternal ? "noopener noreferrer" : undefined}
                  className="
                    flex items-center space-x-2
                    text-white
                    hover:text-[#B4000A]
                    transition-colors
                  "
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>{lastNineDigits}</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sección Inferior */}
        <div className="text-center py-8 text-white border-t border-white mt-4">
          {text}
        </div>
      </div>
    </footer>
  );
}
