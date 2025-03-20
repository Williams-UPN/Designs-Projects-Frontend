import qs from "qs";
import { flattenAttributes } from "@/lib/utils"; // Importamos la función desde la librería utils
import { getStrapiURL } from "@/lib/utils";

// Construimos la query para poblar los datos necesarios
const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          "layaout.main-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: {
                populate: true,
              },
            },
          },
          "layaout.features-section": {
            populate: {
              feature: {
                populate: true,
              },
            },
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

// Función para hacer fetch a Strapi
async function fetchStrapi(path: string) {
  const { baseUrl, token } = getStrapiURL(); // Obtiene URL y token
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error al hacer fetch a Strapi:", error);
    throw error;
  }
}

/**
 * getHomeData
 * Consulta a "/api/home" y extrae el array de bloques, aplanando sus atributos.
 */
export async function getHomeData() {
  // Ajusta el endpoint según lo definido en Strapi ("/api/home" o "/api/home-page")
  const data = await fetchStrapi("/api/home");
  console.dir(data, { depth: null });

  // Extraemos los bloques del objeto de respuesta y aplicamos flattenAttributes
  const { blocks = [] } = data.data || {};
  const flattenedBlocks = blocks.map((block: any) => flattenAttributes(block));

  return { blocks: flattenedBlocks };
}
