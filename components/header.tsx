// components/header.tsx
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { inter } from "@/config/fonts";

interface HeaderData {
  logoText: {
    id: number;
    text: string;
    url: string;
    isExternal?: boolean;
  };
  ctaButton: {
    id: number;
    text: string;
    url: string;
    isExternal?: boolean;
  };
}

interface GlobalImageIco {
  id?: number;
  url: string;
  alternativeText?: string;
}

interface HeaderProps {
  data: HeaderData;
  imageIco?: GlobalImageIco; 
}

export async function Header({ data, imageIco }: Readonly<HeaderProps>) {
  if (!data) {
    console.error("No se han recibido datos para el Header");
    return null;
  }
  const { logoText, ctaButton } = data;

  return (
    <div
      className={`${inter.className} flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800`}
    >
      <Logo
        text={logoText?.text || ""}//el texto que coloquemos por defecto sera  el que este al costado del titulo
        image={imageIco} 
      />

      <div className="flex items-center gap-4">
        <Link href={ctaButton?.url || "/"}>
          <Button>{ctaButton?.text || "Sign in"}</Button>
        </Link>
      </div>
    </div>
  );
}
