import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

async function fetchStrapi(path: string, queryString?: string) {
  const { baseUrl, token } = getStrapiURL();
  const url = new URL(path, baseUrl);

  // Usa la query recibida o, de lo contrario, usa homePageQuery (unificada)
  url.search = queryString ?? homePageQuery;

  console.log("Fetching URL:", url.toString());

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response from Strapi:", errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error al hacer fetch a Strapi:", error);
    throw error;
  }
}

// Query unificada para obtener todos los componentes en blocks: SEO, header, features, services y footer
const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          "layaout.seo": {
            populate: "*",
          },
          "layaout.header": {
            populate: {
              imageIco: {
                fields: ["url", "alternativeText"],
              },
              logoText: true,
              ctaButton: true,
            },
          },
          "layaout.features-section": {
            fields: ["title", "description"],
            populate: {
              feature: {
                populate: true,
              },
            },
          },
          "layaout.services-section": {
            fields: ["mainHeading"],
            populate: {
              linkCompleteService: {
                fields: ["heading", "subHeading"],
                populate: "*",
                sort: "heading:asc",
              },
              imageService: {
                fields: ["url", "alternativeText"],
              },
              link: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
          "layaout.footer": {
            fields: ["text", "address", "linkAddress"],
            populate: {
              socialLink: true,
            },
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);


// -------------------------------------------------------------------------
// Obtiene los datos de la página "home" (con todos los bloques: SEO, header, features, services, footer)
export async function getHomeData() {
  noStore();
  const data = await fetchStrapi("/api/home");
  console.dir(data, { depth: null });

  // Extraemos blocks y subHeading del objeto principal
  const { blocks = [], subHeading } = data.data || {};

  // Aplanamos cada bloque para facilitar el uso de sus campos
  const flattenedBlocks = blocks.map((block: any) => flattenAttributes(block));

  // Retornamos blocks y subHeading
  return {
    blocks: flattenedBlocks,
    subHeading, // "Donde cada detalle cuenta una historia"
  };
}


// -------------------------------------------------------------------------
// Obtiene sólo metadatos (title, description) desde /api/home
// En este caso, como home no tiene title/description a nivel root, extraemos del bloque SEO.
export async function getGlobalMetadata() {
  noStore();
  const data = await fetchStrapi("/api/home");
  const { blocks = [] } = data.data || {};
  const seoBlock = blocks.find((block: any) => block.__component === "layaout.seo");

  return {
    data: {
      title: seoBlock?.title || "Epic Next Course",
      description: seoBlock?.description || "Epic Next Course",
    },
  };
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
