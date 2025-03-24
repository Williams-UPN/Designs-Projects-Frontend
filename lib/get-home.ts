import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

async function fetchStrapi(path: string, queryString?: string) {
  const { baseUrl, token } = getStrapiURL();
  const url = new URL(path, baseUrl);

  // Si se pasó una queryString, úsala; de lo contrario, usa homePageQuery
  url.search = queryString ?? homePageQuery;

  console.log("Fetching URL:", url.toString()); // Depuración: Imprime la URL

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json(); // Intenta obtener más detalles del error
      console.error("Error response from Strapi:", errorData); // Depuración: Imprime la respuesta de error
      throw new Error(`Error HTTP: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error al hacer fetch a Strapi:", error);
    throw error;
  }
}

// Este query se usa si no se recibe otro query en fetchStrapi:
const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          // Poblamos la sección de features
          "layaout.features-section": {
            populate: {
              feature: {
                populate: true,
              },
            },
          },
          // Poblamos la sección de servicios: en este caso, el campo "image" está dentro de "link"
          "layaout.services-section": {
            populate: {
              link: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);




// -------------------------------------------------------------------------
// Obtiene los datos de la página "home"
export async function getHomeData() {
  noStore();
  const data = await fetchStrapi("/api/home");
  console.dir(data, { depth: null });

  const { blocks = [] } = data.data || {};
  const flattenedBlocks = blocks.map((block: any) => flattenAttributes(block));

  return { blocks: flattenedBlocks };
}

// -------------------------------------------------------------------------
// Obtiene los datos globales (header, footer)
export async function getGlobal() {
  noStore();

  const globalQuery = qs.stringify(
    {
      populate: {
        // Imagen a nivel raíz
        imageIco: {
          fields: ["url", "alternativeText"],
        },
        // Luego populamos el header
        header: {
          populate: {
            logoText: true,
            ctaButton: true,
          },
        },
        // Y el footer
        footer: {
          populate: {
            logoText: true,
            socialLink: true,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  return await fetchStrapi("/api/global", globalQuery);
}

// -------------------------------------------------------------------------
// Obtiene sólo metadatos (title, description)
export async function getGlobalMetadata() {
  noStore();
  const metadataQuery = qs.stringify(
    {
      fields: ["title", "description"],
    },
    { encodeValuesOnly: true }
  );

  return await fetchStrapi("/api/global", metadataQuery);
}

// -------------------------------------------------------------------------
// Obtiene los datos de slides

export async function getSliderData() {
  noStore();
  
  const query = qs.stringify(
    {
      populate: {
        image: {
          fields: ["url", "alternativeText", "formats"],
        },
      },
      sort: ["createdAt:desc"],
    },
    { encodeValuesOnly: true }
  );

  const response = await fetchStrapi("/api/slides", query);
  return response.data.map((slide: any) => flattenAttributes(slide));
}

