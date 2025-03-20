import qs from "qs";
import { flattenAttributes } from "@/lib/utils"; 
import { getStrapiURL } from "@/lib/utils";


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


export async function getHomeData() {
  const data = await fetchStrapi("/api/home");
  console.dir(data, { depth: null });

  const { blocks = [] } = data.data || {};
  const flattenedBlocks = blocks.map((block: any) => flattenAttributes(block));

  return { blocks: flattenedBlocks };
}

//-------------------------------------------------------------

export async function getGlobal(){
  const { baseUrl } = getStrapiURL();
  // Construimos la URL con /api/global
  const url = new URL("/api/global", baseUrl);
  
  // Usamos array para el populate:
  const globalQuery = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink"
    ]
  }, { encodeValuesOnly: true });
  
  return await fetchStrapi("/api/global", globalQuery);
}
