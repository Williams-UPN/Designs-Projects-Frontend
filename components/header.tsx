"use client";

import React, { useState, useEffect } from "react";
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

interface NavItem {
  id: number;
  text: string;
  url: string;
}

interface HeaderProps {
  data: HeaderData;
  imageIco?: GlobalImageIco;
  navItems?: NavItem[];
}

export function Header({ data, imageIco, navItems }: HeaderProps) {
  if (!data) {
    console.error("No se han recibido datos para el Header");
    return null;
  }

  // Estado para saber si el usuario ha scrolleado
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectamos el scroll y cambiamos el estado
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { logoText, ctaButton } = data;

  // Menú de navegación por defecto
  const defaultNavItems: NavItem[] = [
    { id: 1, text: "Inicio", url: "/" },
    { id: 2, text: "Nosotros", url: "/nosotros" },
    { id: 3, text: "Proyectos", url: "/proyectos" },
    { id: 4, text: "Contacto", url: "/contacto" },
  ];
  const menuItems = navItems || defaultNavItems;

  return (
    <header
      className={`
        ${inter.className}
        w-full z-50 transition-all duration-300
        ${
          isScrolled
            ? // Con scroll: navbar fijo, semitransparente, con desenfoque
              "fixed top-0 left-0 bg-white/70 backdrop-blur-md shadow-md dark:bg-gray-800"
            : // Sin scroll: navbar en flujo normal, opaco
              "relative bg-white shadow-md dark:bg-gray-800"
        }
      `}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Logo text={logoText?.text || ""} image={imageIco} />

        {/* Menú de navegación */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-slate-900 dark:text-white font-medium transition-transform duration-200 hover:scale-105 hover:text-primary"
            >
              {item.text}
            </Link>
          ))}
        </nav>

        {/* Botón */}
        <div className="flex items-center gap-4">
          <Link href={ctaButton?.url || "/"}>
            <Button className="transition-colors duration-200 hover:bg-primary/90">
              {ctaButton?.text || "Sign in"}
            </Button>
          </Link>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden">
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
  );
}
