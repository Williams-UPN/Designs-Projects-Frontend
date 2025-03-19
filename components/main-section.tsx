import Link from "next/link";

interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface LinkItem {
  id: number;
  url: string;
  text: string;
}

interface MainSectionProps {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: LinkItem[]; // Ahora es un array
}

export function MainSection({ data }: { readonly data: MainSectionProps }) {
  console.dir(data, { depth: null });
  const { heading, subHeading, image, link } = data;
  const imageURL = "http://localhost:1337" + image.url;

  // Extraemos el primer elemento del array
  const linkItem = Array.isArray(link) ? link[0] : null;

  return (
    <header className="relative h-[600px] overflow-hidden">
      <img
        alt={image.alternativeText ?? "no alternative text"}
        className="absolute inset-0 object-cover w-full h-full"
        height={1080}
        src={imageURL}
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          {subHeading}
        </p>
        {linkItem && linkItem.url && (
          <Link
            className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
            href={linkItem.url}
          >
            {linkItem.text}
          </Link>
        )}
      </div>
    </header>
  );
}
