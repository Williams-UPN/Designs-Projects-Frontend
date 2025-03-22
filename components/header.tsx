// components/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { inter } from "@/config/fonts";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

interface HeaderData {
  logoText: {
    id: number;
    text: string | null;
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

export function Header({ data, imageIco }: HeaderProps) {
  const { logoText, ctaButton } = data || {};
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          ${inter.className} 
          fixed top-0 left-0 w-full z-50 
          transition-all duration-300
          ${isScrolled ? "bg-white/90 shadow-md h-16" : "bg-white h-25"}
          dark:bg-gray-800
          backdrop-blur-sm
        `}
      >
        <div className="container mx-auto flex items-center justify-between px-0 h-full">
          {/* Logo a la izquierda */}
          <Logo
            text={logoText?.text || ""}
            image={imageIco}
            isScrolled={isScrolled}
          />

          {/* Menú de enlaces y botón CTA en un mismo contenedor (para escritorio) */}
          <div className="hidden md:flex ml-auto items-center space-x-6">
            <Link
              href="/"
              className="font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className="font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/proyectos"
              className="font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
            >
              Proyectos
            </Link>
            <Link
              href="/contacto"
              className="font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
            >
              Contacto
            </Link>
            <Link href={ctaButton?.url || "/"}>
              <Button className="transition-colors duration-200 hover:bg-primary/90">
                {ctaButton?.text || "Sign in"}
              </Button>
            </Link>
          </div>

          {/* Menú móvil: icono hamburguesa */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="text-slate-900 dark:text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Espaciador para evitar que el contenido quede tapado */}
      <div className={isScrolled ? "h-14" : "h-24"} />
    </>
  );
}
