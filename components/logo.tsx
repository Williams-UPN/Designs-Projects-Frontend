// components/logo.tsx
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
}

export function Logo({
  text = "Logo Text",
  dark = false,
  image,
}: Readonly<LogoProps>) {
  return (
    <Link className="flex items-center gap-2" href="/">
      {image?.url ? (
        <StrapiImage
          src={image.url}
          alt={image.alternativeText ?? "no alt text"}
          height={80}
          width={50}
          className="object-cover"
        />
      ) : (
        // Fallback si no hay imagen
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-pink-500"
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
        className={`text-lg font-semibold ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {text}
      </span>
    </Link>
  );
}
