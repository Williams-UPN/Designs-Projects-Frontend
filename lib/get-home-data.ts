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
                // Solicitamos solo url y alternativeText
                fields: ["url", "alternativeText"],
              },
              link: {
                // Como "link" es un componente repetible,
                // pedimos los campos específicos
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
  // URL base de Strapi (usando la variable de entorno; asegúrate de tenerla definida en .env)
  const baseUrl = process.env.STRAPI_HOST || "http://localhost:1337";
  // Token de Strapi (usado en el servidor, no expuesto al cliente)
  const token = process.env.STRAPI_TOKEN || "";

  const url = new URL(path, baseUrl);
  // Agregamos la query string generada por qs
  url.search = homePageQuery;

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
  }
  return res.json();
}

/**
 * getHomeData
 * Consulta a /api/home y devuelve un objeto transformado con:
 *  - title, description
 *  - blocks -> layaout.main-section (Heading, subHeading, image, link)
 */
export async function getHomeData() {
  const res = await fetchStrapi("/api/home"); // Ajusta si tu endpoint es distinto

  console.dir(res, { depth: null });


  if (!res?.data) {
    throw new Error("Failed to fetch home data: API response invalid");
  }
  
  // Extraemos los atributos de la respuesta, similar a getGlobal
  const attributes = res.data;
  
  return {
    title: attributes.title || "",
    description: attributes.description || "",
    blocks: attributes.blocks || []
  };
}
