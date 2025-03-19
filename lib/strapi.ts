import fetch from 'node-fetch';

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;
if (!STRAPI_HOST || !STRAPI_TOKEN) {
  throw new Error('Faltan variables de entorno: STRAPI_HOST o STRAPI_TOKEN');
}

const host: string = STRAPI_HOST;
const token: string = STRAPI_TOKEN;

// Define la interfaz para la respuesta de Strapi
interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export async function query(url: string): Promise<StrapiResponse<any>> {
  const fullUrl = `${host.replace(/\/$/, '')}/api/${url}`;
  console.log("Consultando URL:", fullUrl);

  const response = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta HTTP:", response.status, errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = (await response.json()) as StrapiResponse<any>;
  console.log("Respuesta de la API:", data);
  return data;
}
