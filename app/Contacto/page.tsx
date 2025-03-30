"use client";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

export default function ContactoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, whatsapp, subject, message }),
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      setFeedback("¡Tu solicitud fue enviada con éxito!");
      setName("");
      setEmail("");
      setWhatsapp("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFeedback("Hubo un error al enviar el formulario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero / Encabezado */}
      <section
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url("/images/contact-bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="text-3xl md:text-5xl text-white font-bold z-10">
          Contacto
        </h1>
      </section>

      {/* Sección de Medios de contacto + Formulario */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna Izquierda: Medios de contacto */}
            <div>
              <div className="mb-8 text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] mb-4">
                  Medios de contacto
                </h2>
                <p className="text-gray-500 max-w-xl text-sm md:text-base leading-relaxed">
                  Si querés saber más sobre lo que hacemos o recibir un
                  presupuesto detallado para tu obra, contactanos. Responderemos
                  lo antes posible.
                </p>
              </div>
              <div className="flex flex-col space-y-6">
                {/* Teléfono */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#FFBA00] text-white p-2 rounded-full flex items-center justify-center">
                    <FaPhoneAlt className="w-4 h-4" />
                  </div>
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                    <p>+54 9 11 3797-0212</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#FFBA00] text-white p-2 rounded-full flex items-center justify-center">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                    <p>info@impacosa.com</p>
                  </div>
                </div>

                {/* Dirección */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#FFBA00] text-white p-2 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                    <p>
                      VILANOVA OFFICE Calle Cacique Coliqueo 1041, Buenos Aires
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start space-x-3">
                  <div className="bg-[#FFBA00] text-white p-2 rounded-full flex items-center justify-center">
                    <FaInstagram className="w-4 h-4" />
                  </div>
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                    <a
                      href="https://www.instagram.com/impacosa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      @impacosa
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <form onSubmit={handleSubmit}>
                {/* Fila 1: Nombre y Correo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold mb-1 text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF9800]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-1 text-gray-700"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF9800]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Tu email"
                    />
                  </div>
                </div>

                {/* Fila 2: WhatsApp y Asunto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-sm font-semibold mb-1 text-gray-700"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF9800]"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Ej: +54 9 11 1111-1111"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold mb-1 text-gray-700"
                    >
                      Asunto
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF9800]"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Asunto de tu consulta"
                    />
                  </div>
                </div>

                {/* Fila 3: Mensaje */}
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-1 text-gray-700"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF9800]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Describe brevemente el servicio que necesitas"
                  />
                </div>

                {/* Feedback */}
                {feedback && (
                  <div className="mb-4 text-sm text-center text-green-600">
                    {feedback}
                  </div>
                )}

                {/* Botón */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF9800] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#e68900] transition-colors focus:outline-none"
                >
                  {loading ? "Enviando..." : "ENVIAR"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1981.0020156728817!2d-79.7705226!3d-6.769361!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904ce9004c71c085%3A0xdabe349d21c39a61!2sPomalca%2C%20Chiclayo%2C%20Per%C3%BA!5e0!3m2!1ses!2spe!4v1743378799257!5m2!1ses!2spe"
              title="Pomalca, Chiclayo, Perú"
              aria-label="Pomalca, Chiclayo, Perú"
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
