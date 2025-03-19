import React from "react";
import type { SocialLinks } from "@/lib/get-global";

type FooterProps = {
  socialLinks: SocialLinks;
};

export function Footer({ socialLinks }: FooterProps) {
  return (
    <footer style={{ padding: "1rem", borderTop: "1px solid #ccc", textAlign: "center" }}>
      <div>
        <a href={socialLinks.facebookUrl.trim()} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>{" "}
        |{" "}
        <a href={socialLinks.instagramUrl.trim()} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>{" "}
        {/* Se ha eliminado el enlace a Twitter */}
        |{" "}
        <a href={socialLinks.tiktokUrl.trim()} target="_blank" rel="noopener noreferrer">
          TikTok
        </a>{" "}
        |{" "}
        <a href={socialLinks.youtubeUrl.trim()} target="_blank" rel="noopener noreferrer">
          YouTube
        </a>{" "}
        |{" "}
        <a href={socialLinks.whatsappUrl.trim()} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>
      <p style={{ marginTop: "0.5rem" }}>
        &copy; {new Date().getFullYear()} - Construingenio. Todos los derechos reservados.
      </p>
    </footer>
  );
}
