"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- Importa el hook
import { inter } from "@/config/fonts";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

interface NavLink {
  id: number;
  url: string;
  text: string;
  isExternal?: boolean;
}

interface HeaderData {
  logoText: NavLink[];
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

export function Header({ data, imageIco }: HeaderProps) {
  const { logoText = [], ctaButton } = data || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hook de Next.js para obtener la ruta actual
  const pathname = usePathname();

  // Solo mostramos "Inicio" si NO estamos en la ruta "/"
  const showInicio = pathname !== "/";

  // Lógica de scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  // Opcional: Insertamos "Inicio" al principio de logoText si showInicio === true
  const finalLinks = showInicio
    ? [{ id: 9999, url: "/", text: "Inicio" }, ...logoText]
    : logoText;

  return (
    <>
      <header
        className={`
          ${inter.className}
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${isScrolled ? "bg-white/70 shadow-md h-16" : "bg-white h-24"}
          dark:bg-gray-800
          backdrop-blur-sm
        `}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8 h-full">
          {/* Logo a la izquierda */}
          <Logo text={""} image={imageIco} isScrolled={isScrolled} />

          {/* Menú de enlaces + Botón CTA para pantallas medianas en adelante */}
          <div className="hidden md:flex ml-auto items-center space-x-6">
            {finalLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
                target={link.isExternal ? "_blank" : "_self"}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
              >
                {link.text}
              </Link>
            ))}

            <Link href={ctaButton?.url || "/"}>
              <Button className="transition-colors duration-200 hover:bg-primary/90">
                {ctaButton?.text || "Sign in"}
              </Button>
            </Link>
          </div>

          {/* Menú móvil: icono hamburguesa para pantallas pequeñas */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="text-slate-900 dark:text-white focus:outline-none"
              aria-label="Abrir menú"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable (solo visible cuando menuOpen === true) */}
        {menuOpen && (
          <nav
            className="
              absolute top-[calc(100%+0.5rem)]
              left-0 w-full
              bg-white dark:bg-gray-800
              border-t border-gray-200 dark:border-gray-700
              shadow-md
              px-4 py-4
              flex flex-col space-y-3
              md:hidden
            "
          >
            {finalLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
                target={link.isExternal ? "_blank" : "_self"}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic
              >
                {link.text}
              </Link>
            ))}

            <Link
              href={ctaButton?.url || "/"}
              onClick={() => setMenuOpen(false)}
            >
              <Button className="transition-colors duration-200 hover:bg-primary/90 w-full">
                {ctaButton?.text || "Sign in"}
              </Button>
            </Link>
          </nav>
        )}
      </header>

      {/* Espaciador para evitar que el contenido quede tapado */}
      <div className={isScrolled ? "h-16" : "h-24"} />
    </>
  );
}
