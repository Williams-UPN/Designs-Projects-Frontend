import React from "react";

type NavbarProps = {
  siteName: string;
};

export function Navbar({ siteName }: NavbarProps) {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>{siteName}</h1>
      {/* Aquí puedes agregar enlaces de navegación */}
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/about">Acerca</a>
        </li>
        <li>
          <a href="/contact">Contacto...</a>
        </li>
      </ul>
    </nav>
  );
}
