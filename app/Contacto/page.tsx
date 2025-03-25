"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      // Si todo va bien, mostramos un mensaje
      setFeedback("¡Tu solicitud fue enviada con éxito!");
      // Limpia los campos
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFeedback("Hubo un error al enviar el formulario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Contáctanos</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Correo electrónico:
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Tu email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block font-medium mb-1">
            Mensaje:
          </label>
          <textarea
            id="message"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Describe brevemente el servicio que necesitas"
          />
        </div>

        {feedback && (
          <div className="mb-4 text-sm text-center text-green-600">
            {feedback}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
