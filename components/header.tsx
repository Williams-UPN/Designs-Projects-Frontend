import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { inter } from "@/config/fonts";

interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  };
}

export async function Header({ data }: Readonly<HeaderProps>) {
  if (!data) {
    console.error("No se han recibido datos para el Header");
    return null;
  }
  const { logoText, ctaButton } = data;
  return (
    <div className={`${inter.className} flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800`}>
      <Logo text={logoText?.text || "Logo"} />
      <div className="flex items-center gap-4">
        <Link href={ctaButton?.url || "/"}>
          <Button>{ctaButton?.text || "Sign in"}</Button>
        </Link>
      </div>
    </div>
  );
}
