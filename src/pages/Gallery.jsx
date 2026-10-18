import React, { useState, useMemo } from "react";
import { galleryItems, galleryCategories } from "../content/gallery";
import Lightbox from "../components/Lightbox";

/**
 * Komponen Gambar Galeri dengan Lazy Loading & Shimmer Skeleton Placeholder
 */
function GalleryCard({ item, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left bg-susu border-2 border-tua rounded-xl overflow-hidden shadow-xs hover:border-karamel hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-full transform hover:-translate-y-1"
      aria-label={`Buka foto ${item.title}`}
    >
      {/* Kontainer Gambar dengan Rasio Presisi & Skeleton */}
      <div className="relative w-full aspect-square overflow-hidden bg-mentega/20 border-b-2 border-tua">
        {/* Shimmer skeleton saat foto sedang dimuat (lazy loading) */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-mentega/15 via-mentega/35 to-mentega/15 animate-pulse flex items-center justify-center">
            <span className="text-[10px] uppercase font-bold text-karamel/50 tracking-wider">
              Memuat...
            </span>
          </div>
        )}

        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-108 transition-all duration-500 ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          width="400"
          height="400"
        />

        {/* Badge Kategori Kecil di Sudut Foto */}
        {item.category && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-tua/85 text-susu backdrop-blur-xs shadow-xs border border-susu/20 pointer-events-none">
            {item.category}
          </span>
        )}
      </div>

      {/* Info Judul & Keterangan Foto */}
      <div className="p-3 sm:p-4 w-full flex-1 flex flex-col justify-between">
        <h3 className="font-judul text-xs sm:text-sm text-tua line-clamp-1 group-hover:text-karamel transition-colors">
          {item.title}
        </h3>
        {item.caption && (
          <p className="text-[11px] sm:text-xs text-karamel/85 line-clamp-2 mt-1 leading-snug">
            {item.caption}
          </p>
        )}
      </div>
    </button>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Filter foto berdasarkan kategori yang aktif
  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activePhoto = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-keju doodle-pattern min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Halaman */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
            Dokumentasi & Perjalanan Kami
          </span>
          <h1 className="font-judul text-3xl sm:text-4xl md:text-5xl text-tua mb-3">
            Galeri Makaroni Lestari
          </h1>
          <p className="text-sm sm:text-base text-karamel leading-relaxed">
            Kumpulan momen kunjungan tokoh nasional, edukasi sekolah & kampus, pameran kuliner, hingga kemitraan resmi Makaroni Keju Lestari sejak 2012.
          </p>
        </div>

        {/* Filter Kategori Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {galleryCategories.map((cat) => {
            const count =
              cat === "Semua"
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedPhotoIndex(null);
                }}
                className={`btn-press px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs border ${
                  isActive
                    ? "bg-tua text-susu border-tua shadow-md scale-102"
                    : "bg-susu/80 text-tua border-tua/20 hover:bg-susu hover:border-tua"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? "bg-mentega text-tua font-black" : "bg-tua/10 text-tua"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid Galeri dengan Efek Lazy Loading Responsif */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setSelectedPhotoIndex(idx)}
            />
          ))}
        </div>

        {/* Footer info galeri */}
        <div className="mt-12 text-center">
          <p className="text-xs text-karamel font-medium">
            Menampilkan <span className="font-bold text-tua">{filteredItems.length}</span> dokumentasi foto
          </p>
        </div>

        {/* Lightbox Modal Presisi Center */}
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
