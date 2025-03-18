import fetch from 'node-fetch';

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

// Define la interfaz para la respuesta de Strapi
interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export async function query(url: string): Promise<StrapiResponse<any>> {
  const response = await fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta HTTP:", response.status, errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // Aserción de tipo para que TypeScript reconozca la estructura
  const data = (await response.json()) as StrapiResponse<any>;
  console.log("Respuesta de la API:", data);
  return data;
}
