import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
  priority?: boolean;
  fill?: boolean; // Nueva prop para habilitar fill
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  priority = false,
  fill = false, // Valor por defecto false
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      priority={priority}
      className={className}
      // Si fill es true, usamos la prop fill; de lo contrario, usamos height y width
      {...(fill ? { fill: true } : { height, width })}
    />
  );
}
