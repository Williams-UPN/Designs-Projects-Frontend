import Link from "next/link";
import { StrapiImage } from "@/components/strapiImage";

interface LogoImage {
  url: string;
  alternativeText?: string;
}

interface LogoProps {
  text?: string;
  dark?: boolean;
  image?: LogoImage;
  isScrolled?: boolean; // <-- Nueva prop
}

export function Logo({
  text = "Logo Text",
  dark = false,
  image,
  isScrolled = false,
}: Readonly<LogoProps>) {
  // Ajustamos dinámicamente el tamaño del logo según scroll
  const logoWidth = isScrolled ? 40 : 60;  // ajusta a gusto
  const logoHeight = isScrolled ? 40 : 60; // ajusta a gusto

  return (
    <Link className="flex items-center gap-2" href="/">
      {image?.url ? (
        <StrapiImage
          src={image.url}
          alt={image.alternativeText ?? "Logo"}
          width={logoWidth}
          height={logoHeight}
          className="object-cover transition-all duration-300"
          priority
        />
      ) : (
        // Fallback si no hay imagen
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-300 ${isScrolled ? "h-8 w-8" : "h-12 w-12"} text-pink-500`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      )}

      <span
        className={`text-lg font-semibold transition-all duration-300 ${
          dark ? "text-white" : "text-slate-900"
        } ${isScrolled ? "text-base" : "text-xl"}`}
      >
        {text}
      </span>
    </Link>
  );
}
