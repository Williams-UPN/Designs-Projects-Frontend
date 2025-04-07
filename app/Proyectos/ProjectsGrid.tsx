"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectItem {
  imageUrl: string;
  heading: string;
  subHeading: string;
  gallery: string[];
}

interface ProjectsGridProps {
  projectImages: ProjectItem[];
}

export default function ProjectsGrid({ projectImages }: ProjectsGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedProjectIndex(index);
    setGalleryIndex(0);
    setModalOpen(true);
  };

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => setAnimateModal(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateModal(false);
    }
  }, [modalOpen]);

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => setModalOpen(false), 800);
  };

  const nextSlide = () => {
    const gallery = getGallery();
    setGalleryIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    const gallery = getGallery();
    setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const getGallery = () => {
    const project = projectImages[selectedProjectIndex];
    return project.gallery?.length ? project.gallery : [project.imageUrl];
  };

  const currentProject = projectImages[selectedProjectIndex];
  const gallery = getGallery();

  return (
    <>
      <div className="flex flex-wrap justify-center items-stretch gap-6">
        {projectImages.map((project, index) => (
          <div
            key={index}
            className="
        w-full sm:w-1/2 lg:w-1/3 max-w-sm
        bg-white rounded-xl shadow-md hover:shadow-lg transition-transform
        hover:-translate-y-1 cursor-pointer overflow-hidden border border-transparent
        hover:border-[#3EA6D2] hover:rounded-xl
      "
            onClick={() => openModal(index)}
          >
            <Image
              src={project.imageUrl}
              alt={project.heading}
              width={768}
              height={379}
              className="w-full h-[250px] object-cover"
            />
          </div>
        ))}
      </div>


      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-600"
          onClick={closeModal}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <div
            className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl h-[80vh] flex transition-transform duration-800"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: animateModal ? "translateY(0)" : "translateY(-100vh)",
            }}
          >
            {/* Texto del proyecto */}
            <div className="w-1/2 flex flex-col items-center justify-center px-8">
              <h2 className="text-2xl md:text-4xl font-bold text-[#3EA6D2] mb-4 text-center">
                {currentProject.heading}
              </h2>
              <p className="text-gray-500 max-w-xl text-sm md:text-base text-justify leading-relaxed">
                {currentProject.subHeading}
              </p>
            </div>

            {/* Slider de imágenes */}
            <div className="w-1/2 relative flex items-center justify-center">
              <button
                onClick={prevSlide}
                className="absolute left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                &lt;
              </button>
              <Image
                src={gallery[galleryIndex]}
                alt={`${currentProject.heading} - Imagen ${galleryIndex + 1}`}
                width={500}
                height={400}
                className="rounded-lg object-cover"
              />
              <button
                onClick={nextSlide}
                className="absolute right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                &gt;
              </button>
            </div>

            {/* Botón cerrar */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
