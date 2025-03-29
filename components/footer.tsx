"use client";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { inter } from "@/config/fonts";
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

type LogoText = {
  id: number;
  text: string;
  url: string;
};

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
    logoText: LogoText | LogoText[];
    text: string;
    socialLink?: SocialLink[];
  };
  imageIco?: GlobalImageIco;
}

export function Footer({ data, imageIco }: Readonly<FooterProps>) {
  if (!data) {
    console.error("No se han recibido datos para el Footer");
    return null;
  }

  const { logoText, text, socialLink } = data;
  const singleLogoText = Array.isArray(logoText) ? logoText[0] : logoText;

  // Redes sociales específicas
  const instagram = socialLink?.find((link) =>
    link.text.toLowerCase().includes("instagram") ||
    link.url.toLowerCase().includes("instagram")
  );
  const whatsapp = socialLink?.find((link) =>
    link.text.toLowerCase().includes("whatsapp") ||
    link.url.toLowerCase().includes("whatsapp") ||
    link.url.toLowerCase().includes("wa.me")
  );

  return (
    <footer className={`${inter.className} bg-white text-base`}>
      <div className="container mx-auto px-6 md:px-40 py-6">
        {/* Sección Superior: Dos columnas */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Columna Izquierda: Logo e Instagram */}
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <Logo
              dark
              text={singleLogoText?.text || "Construingenio"}
              image={imageIco}
            />
            {instagram && (
              <div className="flex items-center space-x-2">
                <Link
                  href={instagram.url}
                  target={instagram.isExternal ? "_blank" : "_self"}
                  rel={instagram.isExternal ? "noopener noreferrer" : undefined}
                  className="
                    flex items-center space-x-2
                    text-gray-800
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
          <div className="mt-6 md:mt-0 flex flex-col items-start space-y-2">
            {/* Dirección con Link a Maps */}
            <Link
              href="https://maps.app.goo.gl/jULwTjdwhwfkq7D46"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center space-x-2
                text-gray-800
                hover:text-[#B4000A]
                transition-colors
              "
            >
              <FaMapMarkerAlt className="w-5 h-5" />
              <span className="text-left">
                {" Cal. San Borja Mza. G Lote. 15 P.J. San Borja, Pomalca, Chiclayo, Lambayeque, Perú "}
              </span>
            </Link>
            {whatsapp && (
              <div className="flex items-center space-x-2">
                <Link
                  href={whatsapp.url}
                  target={whatsapp.isExternal ? "_blank" : "_self"}
                  rel={whatsapp.isExternal ? "noopener noreferrer" : undefined}
                  className="
                    flex items-center space-x-2
                    text-gray-800
                    hover:text-[#B4000A]
                    transition-colors
                  "
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span> {" 956 498 610"}</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sección Inferior */}
        <div className="text-center py-6 text-gray-800 border-t border-gray-200 mt-4">
          {text || "© 2025 - Construingenio. Todos los derechos reservados."}
        </div>
      </div>
    </footer>
  );
}
