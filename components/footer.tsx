"use client";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { inter } from "@/config/fonts";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import Lottie from "lottie-react";
import whatsappAnimation from "@/public/animations/whatsapp.json";
import mapsAnimation from "@/public/animations/maps.json";
import mailAnimation from "@/public/animations/mail.json";

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

  // Instagram
  const instagram = socialLink?.find((link) =>
    link.text.toLowerCase().includes("instagram") ||
    link.url.toLowerCase().includes("instagram")
  );

  // Facebook
  const facebook = socialLink?.find((link) =>
    link.text.toLowerCase().includes("facebook") ||
    link.url.toLowerCase().includes("facebook")
  );

  // YouTube
  const youtube = socialLink?.find((link) =>
    link.text.toLowerCase().includes("youtube") ||
    link.url.toLowerCase().includes("youtube")
  );

  // WhatsApp
  const whatsapp = socialLink?.find((link) =>
    link.text.toLowerCase().includes("whatsapp") ||
    link.url.toLowerCase().includes("whatsapp") ||
    link.url.toLowerCase().includes("wa.me")
  );

  // Extraemos sólo los últimos 9 dígitos del número de WhatsApp
  let lastNineDigits = "";
  if (whatsapp) {
    const onlyDigits = whatsapp.url.replace(/\D+/g, "");
    lastNineDigits = onlyDigits.slice(-9);
  }

  // Correo: texto "correo" o que contenga "@" (pero que no sea YouTube)
  const emailLink = socialLink?.find((link) =>
    link.text.toLowerCase().includes("correo") ||
    (link.url.includes("@") && !link.url.toLowerCase().includes("youtube.com/@") && !link.url.toLowerCase().includes("tiktok.com/@"))


  );

  return (
    <footer className={`${inter.className} bg-[#3EA6D2]/55 text-base text-white`}>
      <div className="container mx-auto px-6 md:px-40 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Columna Izquierda: Logo e íconos de redes sociales */}
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <Logo dark text="" image={imageIco} />

            {instagram && (
              <div className="flex items-center space-x-2">
                <Link
                  href={instagram.url}
                  target={instagram.isExternal ? "_blank" : "_self"}
                  rel={instagram.isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center space-x-2 text-white transition-colors hover:text-[#B4000A]"
                >
                  <FaInstagram className="w-5 h-5 text-[#E4405F] group-hover:text-[#B4000A]" />
                  <span>Síguenos en Instagram</span>
                </Link>
              </div>
            )}

            {facebook && (
              <div className="flex items-center space-x-2">
                <Link
                  href={facebook.url}
                  target={facebook.isExternal ? "_blank" : "_self"}
                  rel={facebook.isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center space-x-2 text-white transition-colors hover:text-[#B4000A]"
                >
                  <FaFacebookF className="w-5 h-5 text-[#1877F2] group-hover:text-[#B4000A]" />
                  <span>Míranos en Facebook</span>
                </Link>
              </div>
            )}

            {youtube && (
              <div className="flex items-center space-x-2">
                <Link
                  href={youtube.url}
                  target={youtube.isExternal ? "_blank" : "_self"}
                  rel={youtube.isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center space-x-2 text-white transition-colors hover:text-[#B4000A]"
                >
                  <FaYoutube className="w-5 h-5 text-[#FF0000] group-hover:text-[#B4000A]" />
                  <span>Suscríbete en YouTube</span>
                </Link>
              </div>
            )}
          </div>

          {/* Columna Derecha: Dirección, Correo y WhatsApp */}
          <div className="mt-6 md:mt-0 flex flex-col items-start space-y-6">
            {/* Dirección */}
            {address && linkAddress && (
              <Link
                href={linkAddress}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white transition-colors hover:text-[#B4000A]"
              >
                <Lottie animationData={mapsAnimation} loop={true} className="w-8 h-8" />
                <span className="text-left">{address}</span>
              </Link>
            )}

            {/* Correo traído de Strapi */}
            {emailLink && (
              <div className="flex items-center space-x-2">
                <Link
                  href={`mailto:${emailLink.url}`}
                  className="group flex items-center space-x-2 text-white transition-colors hover:text-[#B4000A]"
                >
                  <Lottie animationData={mailAnimation} loop={true} className="w-8 h-8" />
                  <span>{emailLink.url}</span>
                </Link>
              </div>
            )}

            {/* WhatsApp */}
            {whatsapp && lastNineDigits && (
              <div className="flex items-center space-x-2">
                <Link
                  href={whatsapp.url}
                  target={whatsapp.isExternal ? "_blank" : "_self"}
                  rel={whatsapp.isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center space-x-2 text-white transition-colors hover:text-[#B4000A]"
                >
                  <Lottie animationData={whatsappAnimation} loop={true} className="w-8 h-8" />
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
