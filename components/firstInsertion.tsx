// @/components/firstInsertion.tsx
import { getHome } from "@/lib/get-home";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function FirstInsertion() {
  const { title, description } = await getHome();

  return (
    <section className="relative bg-[#0f172a]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* Columna Izquierda: Texto */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight md:text-5xl xl:text-6xl text-white mb-4">
              {title}
            </h1>

            <div className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mb-6">
              {/* Renderizado de la descripción con BlocksRenderer (o texto plano) */}
              <BlocksRenderer content={description} />
            </div>

            <a
              href="/categories"
              className="inline-flex items-center px-5 py-3 text-base font-medium text-white bg-primary-700 
                         rounded-md hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 
                         dark:focus:ring-primary-900 transition-colors"
            >
              Show categories
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586L10.293 5.707a1 
                     1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="hidden lg:block lg:col-span-5">
            <img
              alt="Hero image"
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
