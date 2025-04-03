"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPlus,
  FaMinus,
  FaEnvelope, // Ícono para el correo
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

interface SocialLink {
  id: number;
  text: string;
  url: string;
  isExternal?: boolean;
}

function getBrandColor(url: string) {
  if (url.includes("youtube")) return "bg-red-600 hover:bg-red-700";
  if (url.includes("tiktok")) return "bg-black hover:bg-gray-800";
  if (url.includes("facebook")) return "bg-blue-600 hover:bg-blue-700";
  if (url.includes("instagram")) return "bg-pink-500 hover:bg-pink-600";
  if (url.includes("whatsapp") || url.includes("wa.me"))
    return "bg-green-500 hover:bg-green-600";
  if (url.includes("@")) return "bg-red-500 hover:bg-red-600";
  return "bg-gray-500 hover:bg-gray-600";
}

function selectSocialIcon(url: string) {
  if (url.includes("youtube")) return <FaYoutube className="w-6 h-6" />;
  if (url.includes("tiktok")) return <SiTiktok className="w-6 h-6" />;
  if (url.includes("facebook")) return <FaFacebookF className="w-6 h-6" />;
  if (url.includes("instagram")) return <FaInstagram className="w-6 h-6" />;
  if (url.includes("whatsapp") || url.includes("wa.me"))
    return <FaWhatsapp className="w-6 h-6" />;
  if (url.includes("@")) return <FaEnvelope className="w-6 h-6" />;
  return null;
}

export function FloatingSocialButtons({ socialLink }: { socialLink: SocialLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Botón principal si el menú está cerrado (signo "+", rojo) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            bg-red-500 text-white p-4 rounded-full shadow-lg
            transition-transform duration-300
            hover:scale-110
            focus:outline-none
          "
          aria-label="Abrir redes sociales"
        >
          <FaPlus className="w-5 h-5" />
        </button>
      )}

      {/* Menú desplegado si open === true */}
      {open && (
        <div className="flex flex-col items-end space-y-2">
          {/* Íconos de redes con efecto 'explosión azul' INVERTIDO */}
          {socialLink.map((link, index) => {
            const brandClasses = getBrandColor(link.url);
            const delay = 0.1 * (socialLink.length - 1 - index);
            // El último ícono del array aparece primero (delay=0)
            // y el primero del array aparece de último (delay máximo)

            return (
              <Link
                key={link.id}
                href={
                  isValidEmail(link.url) && !link.url.startsWith("mailto:")
                    ? `mailto:${link.url}`
                    : link.url
                }
                target={link.isExternal ? "_blank" : "_self"}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className={`
                  ${brandClasses}
                  text-white p-3 rounded-full shadow
                  transition-transform duration-300
                  hover:scale-110
                  flex items-center justify-center
                  explosion-blue
                `}
                style={{
                  animationDelay: `${delay}s`,
                }}
                aria-label={link.text}
              >
                {selectSocialIcon(link.url)}
              </Link>
            );
          })}

          {/* Botón para cerrar el menú (signo "–", azul) */}
          <button
            onClick={() => setOpen(false)}
            className="
              bg-[#3EA6D2] text-white p-3 rounded-full shadow
              transition-transform duration-300
              hover:scale-110
              focus:outline-none
            "
            aria-label="Cerrar redes sociales"
          >
            <FaMinus className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function isValidEmail(url: string): boolean {
  // Esta expresión regular es sencilla y valida un formato básico de email.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url);
}

