import qs from "qs";

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
                // Usamos "populate: true" para traer todos los campos del componente link
                populate: true,
              },
            },
          },
        },
      },
    },
  },
  // Si necesitas codificar solo los valores, puedes agregar: { encodeValuesOnly: true }
  { encodeValuesOnly: true }
);

// Función para hacer fetch a Strapi
async function fetchStrapi(path: string) {
  const baseUrl = process.env.STRAPI_HOST || "http://localhost:1337";
  const token = process.env.STRAPI_TOKEN || "";

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
 * Consulta a "/api/home" y extrae el array de bloques.
 */
export async function getHomeData() {
  // Ajusta el endpoint según lo definido en Strapi ("/api/home" o "/api/home-page")
  const data = await fetchStrapi("/api/home");
  console.dir(data, { depth: null });

  // Extraemos los bloques del objeto de respuesta
  const { blocks = [] } = data.data || {};

  return { blocks };
}
