import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

// Este query se usa si no se recibe otro query en fetchStrapi:
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

async function fetchStrapi(path: string, queryString?: string) {
  const { baseUrl, token } = getStrapiURL();
  const url = new URL(path, baseUrl);

  // Si se pasó una queryString, úsala; de lo contrario, usa homePageQuery
  url.search = queryString ?? homePageQuery;

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
