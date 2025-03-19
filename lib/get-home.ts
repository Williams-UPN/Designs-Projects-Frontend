import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export function getHome() {
    return query("home")
        .then((res) => {
            // Desestructuramos los campos que necesitamos de res.data
            const { title, description} = res.data;


            // Retornamos los datos en el formato deseado
            return { title, description};
        });
}