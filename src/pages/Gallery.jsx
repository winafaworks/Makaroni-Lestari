import React, { useState } from "react";
import { galleryItems } from "../content/gallery";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const activePhoto = selectedPhotoIndex !== null ? galleryItems[selectedPhotoIndex] : null;

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-keju doodle-pattern min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Halaman */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
            Dokumentasi & Produk
          </span>
          <h1 className="font-judul text-3xl sm:text-4xl md:text-5xl text-tua mb-3">
            Galeri Makaroni Lestari
          </h1>
          <p className="text-sm sm:text-base text-karamel">
            Klik foto untuk memperbesar tampilan dan melihat detail kerenyahan makaroni kami.
          </p>
        </div>

        {/* Grid Galeri (2 kolom di ponsel, 3 di tablet, 4 di desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group text-left bg-susu border-2 border-tua rounded-sm overflow-hidden shadow-xs hover:border-karamel hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              aria-label={`Buka foto ${item.title}`}
            >
              <div className="w-full aspect-square overflow-hidden bg-mentega/30 border-b-2 border-tua">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width="300"
                  height="300"
                />
              </div>

              <div className="p-3 w-full">
                <h3 className="font-bold text-xs sm:text-sm text-tua truncate">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-[11px] text-karamel line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <Lightbox
            item={activePhoto}
            onClose={() => setSelectedPhotoIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
