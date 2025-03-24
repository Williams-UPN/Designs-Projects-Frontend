import Link from "next/link";
import { Logo } from "@/components/logo";
import { inter } from "@/config/fonts";
// Importamos los íconos deseados
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

interface SocialLink {
  id: number;
  text: string;
  url: string;
  isExternal?: boolean;
}

// Definimos un tipo para el logo:
type LogoText = {
  id: number;
  text: string;
  url: string;
};

interface FooterProps {
  data: {
    // Aquí permitimos que logoText sea un único objeto O un array de objetos
    logoText: LogoText | LogoText[];
    text: string;
    socialLink: SocialLink[];
  };
}

function selectSocialIcon(url: string) {
  // Detecta la red social por la URL
  if (url.includes("youtube")) return <FaYoutube className="h-6 w-6" />;
  if (url.includes("tiktok")) return <SiTiktok className="h-6 w-6" />;
  if (url.includes("facebook")) return <FaFacebookF className="h-6 w-6" />;
  if (url.includes("instagram")) return <FaInstagram className="h-6 w-6" />;
  return null;
}

export function Footer({ data }: Readonly<FooterProps>) {
  if (!data) {
    console.error("No se han recibido datos para el Footer");
    return null;
  }

  const { logoText, socialLink, text } = data;

  // Conviértelo a un solo objeto, aunque sea un array
  const singleLogoText = Array.isArray(logoText)
    ? logoText[0] // si hay varios, tomamos el primero
    : logoText;    // si ya es objeto, lo usamos directo

  return (
    <footer className={`${inter.className} bg-gray-900 text-white py-8 dark:bg-gray-900`}>
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Logo */}
        <Logo dark text={singleLogoText?.text || "Logo"} />

        {/* Texto del footer */}
        <p className="text-sm text-gray-300 text-center md:text-left">
          {text || "Made with love"}
        </p>

        {/* Redes sociales */}
        <div className="flex items-center justify-center space-x-4">
          {socialLink?.map((link) => (
            <Link
              className="text-white hover:text-gray-300"
              href={link.url}
              key={link.id}
              target={link.isExternal ? "_blank" : "_self"}
            >
              {selectSocialIcon(link.url)}
              <span className="sr-only">Visit us at {link.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
