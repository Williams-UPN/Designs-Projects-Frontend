"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { StrapiImage } from "@/components/strapiImage";
import { inter } from "@/config/fonts";

export interface SliderImage {
  id: number;
  image: {
    url: string;
    alternativeText?: string;
    formats?: any;
  };
}

interface ImageSliderProps {
  slides: SliderImage[];
  globalSubheading?: string;
}

export default function ImageSlider({ slides, globalSubheading }: ImageSliderProps) {
  const finalSubheading = globalSubheading || "Texto predeterminado";

  return (
    <div className="relative w-full hero-slider group mb-28 overflow-visible">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full aspect-[8/3] overflow-visible">
              <StrapiImage
                src={slide.image.url}
                alt={slide.image.alternativeText || "Imagen de slide"}
                width={1920}
                height={1080}
                priority
                className="object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          translate-y-1/2
          bg-white/90 text-black
          py-6 px-10
          w-[64%]
          rounded-lg shadow-md
          z-10
          ${inter.className}
          text-xl md:text-6xl
          font-bold
          text-center
        `}
      >
        {finalSubheading}
      </div>

      <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-black/30 !rounded-full hover:!bg-black/50 transition-all" />
      <div className="swiper-button-next !text-white !w-12 !h-12 !bg-black/30 !rounded-full hover:!bg-black/50 transition-all" />
    </div>
  );
}
