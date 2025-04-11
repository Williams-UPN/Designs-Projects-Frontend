"use client";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";

interface SocialLink {
  id: number;
  text: string;
  url: string;
  isExternal?: boolean;
}

interface ContactPageData {
  socialLink?: SocialLink[];
  address?: string;
  linkAddress?: string;
  text?: string;
  imageContact?: {
    url?: string;
    data?: {
      attributes?: {
        url?: string;
      };
    };
  };
}

interface ContactoPageProps {
  data: ContactPageData;
}

export default function ContactoPage({ data = {} }: ContactoPageProps) {
  const { socialLink, address, linkAddress, imageContact } = data;

  // Usamos el enlace de WhatsApp para obtener el teléfono
  const phoneLink = socialLink?.find((link) =>
    link.text.toLowerCase().includes("whatsapp") ||
    link.url.toLowerCase().includes("wa.me")
  );
  // Extraemos solo los dígitos (últimos 9) del enlace de WhatsApp
  let lastNineDigits = "";
  if (phoneLink) {
    const onlyDigits = phoneLink.url.replace(/\D+/g, "");
    lastNineDigits = onlyDigits.slice(-9);
  }

  // Correo: buscamos "correo" o que contenga "@" (excluyendo YouTube/TikTok)
  const emailLink = socialLink?.find((link) =>
    link.text.toLowerCase().includes("correo") ||
    (link.url.includes("@") &&
      !link.url.toLowerCase().includes("youtube.com/@") &&
      !link.url.toLowerCase().includes("tiktok.com/@"))
  );

  // Instagram
  const instagramLink = socialLink?.find((link) =>
    link.text.toLowerCase().includes("instagram") ||
    link.url.toLowerCase().includes("instagram")
  );

  // Estados del formulario (formulario estático por el momento)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Formulario estático: no se envía información por el momento.
  }

  return (
    <>
      {/* Hero: usamos la imagen extraída de imageContact */}
      <ImageMainService imageMain={imageContact} />

      {/* Sección de Medios de contacto + Formulario */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Columna Izquierda: Medios de contacto */}
            <div>
              <div className="mb-8 text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] mb-4">
                  Medios de contacto
                </h2>
                <p className="text-gray-500 max-w-xl text-sm md:text-base text-justify leading-relaxed">
                  Si deseas saber más sobre lo que hacemos o recibir un presupuesto detallado para tu proyecto, contáctanos. Te responderemos lo antes posible.
                </p>
              </div>
              <div className="flex flex-col space-y-6">
                {phoneLink && (
                  <Link
                    href={`tel:${phoneLink.url}`}
                    target={phoneLink.isExternal ? "_blank" : "_self"}
                    rel={phoneLink.isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center space-x-3 transition-colors hover:text-[#B4000A]"
                  >
                    <div className="bg-white border border-[#3EA6D2] text-[#3EA6D2] p-2 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:border-[#B4000A] group-hover:text-[#B4000A]">
                      <FaPhoneAlt className="w-4 h-4" />
                    </div>
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-[#B4000A]">
                      <p>{lastNineDigits}</p>
                    </div>
                  </Link>
                )}
                {emailLink && (
                  <Link
                    href={`mailto:${emailLink.url}`}
                    target={emailLink.isExternal ? "_blank" : "_self"}
                    rel={emailLink.isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center space-x-3 transition-colors hover:text-[#B4000A]"
                  >
                    <div className="bg-white border border-[#3EA6D2] text-[#3EA6D2] p-2 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:border-[#B4000A] group-hover:text-[#B4000A]">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-[#B4000A]">
                      <p>{emailLink.url}</p>
                    </div>
                  </Link>
                )}
                {address && linkAddress && (
                  <Link
                    href={linkAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-3 transition-colors hover:text-[#B4000A]"
                  >
                    <div className="bg-white border border-[#3EA6D2] text-[#3EA6D2] p-2 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:border-[#B4000A] group-hover:text-[#B4000A]">
                      <FaMapMarkerAlt className="w-4 h-4" />
                    </div>
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-[#B4000A]">
                      <p>{address}</p>
                    </div>
                  </Link>
                )}
                {instagramLink && (
                  <Link
                    href={instagramLink.url}
                    target={instagramLink.isExternal ? "_blank" : "_self"}
                    rel={instagramLink.isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center space-x-3 transition-colors hover:text-[#B4000A]"
                  >
                    <div className="bg-white border border-[#3EA6D2] text-[#3EA6D2] p-2 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:border-[#B4000A] group-hover:text-[#B4000A]">
                      <FaInstagram className="w-4 h-4" />
                    </div>
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-[#B4000A]">
                      <p>Síguenos en Instagram</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Columna Derecha: Formulario estático */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-1 text-gray-700">
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B4000A]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-700">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B4000A]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Tu email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-semibold mb-1 text-gray-700">
                      WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B4000A]"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Ej: +51 999 999 999"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-1 text-gray-700">
                      Asunto
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B4000A]"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Asunto de tu consulta"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-semibold mb-1 text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B4000A]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Describe brevemente el servicio que necesitas"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3EA6D2] text-white py-2 rounded-full text-sm font-semibold hover:bg-[#B4000A] transition-colors duration-300 focus:outline-none"
                >
                  ENVIAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa: usando aspect ratio para que sea responsivo */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1665.8023061310319!2d-79.83946481133675!3d-6.773760339508596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904cef28567ae461%3A0xfae5cd2e0e823270!2sTorres%20Paz%20708%2C%20Chiclayo%2014001!5e0!3m2!1ses!2spe!4v1743686834202!5m2!1ses!2spe"
              title="Torres Paz 708, Chiclayo"
              aria-label="Torres Paz 708, Chiclayo"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/** Hero Section que usa imageContact */
function ImageMainService({ imageMain }: { imageMain: any }) {
  const title = "Contacto";
  // Extraemos la URL de la imagen desde imageMain
  const relativeImageUrl =
    imageMain?.data?.attributes?.url || imageMain?.url || null;
  const fullImageUrl = relativeImageUrl
    ? getStrapiMedia(relativeImageUrl)
    : "https://via.placeholder.com/1920x500";

  return (
    <section
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center"
      style={{
        backgroundImage: `url('${fullImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#3EA6D2]/30" />
      <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold z-10">
        {title}
      </h1>
    </section>
  );
}

