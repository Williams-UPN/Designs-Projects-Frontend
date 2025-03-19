// @/lib/get-home-data.ts
import qs from "qs";

const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        // "blocks" es el nombre del Dynamic Zone
        on: {
          // "layaout.main-section" debe coincidir con el valor de __component
          "layaout.main-section": {
            populate: {
              image: {
                // Solo pedimos url y alternativeText
                fields: ["url", "alternativeText"],
              },
              link: {
                // Como "link" es un componente repetible, 
                // en lugar de 'populate=true' también podemos pedir fields específicos
                fields: ["url", "text", "isExternal"],
              },
            },
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

async function fetchStrapi(path: string) {
  // URL base de Strapi (ajusta si tu .env difiere)
  const baseUrl = process.env.STRAPI_HOST || "http://localhost:1337";
  // Token de Strapi (necesario si tu API requiere auth)
  const token = process.env.STRAPI_TOKEN || "";

  const url = new URL(path, baseUrl);
  // Añadimos la query string generada por qs
  url.search = homePageQuery;

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
  }
  return res.json();
}

/**
 * getHomeData
 * Consulta a /api/home y trae:
 *  - title, description
 *  - blocks -> layaout.main-section (Heading, subHeading, image, link)
 */
export async function getHomeData() {
  const data = await fetchStrapi("/api/home"); // Ajusta si tu endpoint es distinto
  return data; // Devuelve todo el JSON
}
