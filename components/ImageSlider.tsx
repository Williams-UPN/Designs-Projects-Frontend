// components/ImageSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { StrapiImage } from "@/components/strapiImage";

export interface SliderImage {
  id: number;
  title: string;
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
    // Añadimos mb-12 (o el valor que quieras) para dar espacio abajo
    <div className="relative w-full hero-slider group mb-28">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full aspect-[8/3]">
            <StrapiImage
                src={slide.image.url}
                alt={slide.image.alternativeText || slide.title}
                width={1920}
                height={1080}
                priority
                className="object-cover w-full h-full"
              />

              {/* Overlay y texto encima */}
              <div className="absolute inset-0 bg-black/0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botones de navegación personalizados */}
      <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-black/30 !rounded-full hover:!bg-black/50 transition-all" />
      <div className="swiper-button-next !text-white !w-12 !h-12 !bg-black/30 !rounded-full hover:!bg-black/50 transition-all" />
    </div>
  );
}
