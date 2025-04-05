"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { StrapiImage } from "@/components/strapiImage";

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
}

export default function ImageSlider({ slides }: ImageSliderProps) {
  return (
    <div className="relative w-full hero-slider group mb-16 md:mb-28 overflow-visible">
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
            {/* Ajustamos la altura según breakpoints */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[8/3] overflow-hidden">
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

      {/* Flechas de navegación con tamaños diferentes en móvil/escritorio */}
      <div className="swiper-button-prev !text-white !w-8 !h-8 sm:!w-12 sm:!h-12 !bg-black/30 !rounded-full hover:!bg-black/50 transition-all" />
      <div className="swiper-button-next !text-white !w-8 !h-8 sm:!w-12 sm:!h-12 !bg-black/30 !rounded-full hover:!bg-black/50 transition-all" />
    </div>
  );
}
