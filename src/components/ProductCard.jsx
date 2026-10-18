import React, { useState } from "react";
import { Link } from "react-router-dom";
import SizeChips from "./SizeChips";
import { IconArrowRight } from "./icons/Icons";

/**
 * Kartu Varian Produk Makaroni Keju Lestari
 * Mendukung layout "stacked" (vertikal untuk grid 3 kolom di Beranda)
 * dan "horizontal" (berdampingan untuk daftar 1 kolom di Halaman Produk).
 */
export default function ProductCard({
  product,
  layout = "stacked",
  alternate = false
}) {
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0].label : ""
  );

  const currentSizeObj =
    product.sizes?.find((s) => s.label === selectedSizeLabel) ||
    product.sizes?.[0];
  const rawPrice = currentSizeObj?.price;

  const imageList = product.images && product.images.length > 0 ? product.images : [product.image];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const currentImage = imageList[currentImgIndex] || product.image;
  const isPackagingPhoto = typeof currentImage === "string" && currentImage.includes("produk_kemasan_lestari");

  // Format harga rapi jika belum diisi owner (TODO)
  const displayPrice =
    !rawPrice || rawPrice.includes("TODO")
      ? "Hubungi kami untuk harga"
      : rawPrice;

  const isStacked = layout === "stacked";

  return (
    <div
      id={product.id}
      className={`frame-kemasan rounded-sm flex flex-col ${
        !isStacked && alternate
          ? "md:flex-row-reverse"
          : !isStacked
          ? "md:flex-row"
          : ""
      } shadow-xs relative overflow-hidden h-full group`}
    >
      {/* Badge: Best Seller */}
      {product.isBestSeller && (
        <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none">
          <span className="bg-tua text-mentega text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-mentega/40 shadow-md">
            Best Seller
          </span>
        </div>
      )}

      {/* Foto Produk Full Width Memenuhi Border Kanan dan Kiri */}
      <div
        className={`${
          isStacked
            ? "w-full aspect-[4/3] sm:aspect-square border-b-2 border-tua"
            : "w-full md:w-56 lg:w-64 aspect-[16/9] sm:aspect-[4/3] md:aspect-square border-b-2 md:border-b-0 " +
              (alternate ? "md:border-l-2" : "md:border-r-2") +
              " border-tua"
        } relative overflow-hidden bg-mentega/40 shrink-0 select-none`}
      >
        <img
          src={currentImage}
          alt={`Makaroni Keju Lestari varian ${product.name}`}
          loading="lazy"
          className={`w-full h-full ${
            isPackagingPhoto
              ? "object-contain p-3 drop-shadow-[0_8px_16px_rgba(58,30,13,0.22)]"
              : "object-cover"
          } group-hover:scale-105 transition-all duration-300`}
          width="400"
          height="400"
        />



        {/* Navigasi Carousel di Dalam Border jika Lebih dari 1 Foto */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Foto sebelumnya"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-susu/95 text-tua border-2 border-tua flex items-center justify-center hover:bg-mentega transition-all shadow-md cursor-pointer z-20 hover:scale-110 active:scale-95"
            >
              <span className="text-base font-bold leading-none -ml-0.5">‹</span>
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Foto berikutnya"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-susu/95 text-tua border-2 border-tua flex items-center justify-center hover:bg-mentega transition-all shadow-md cursor-pointer z-20 hover:scale-110 active:scale-95"
            >
              <span className="text-base font-bold leading-none -mr-0.5">›</span>
            </button>

            {/* Dot Indicator di bagian bawah foto border */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-tua/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-susu/20">
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  aria-label={`Buka slide foto ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentImgIndex
                      ? "bg-mentega w-4"
                      : "bg-susu/50 hover:bg-susu w-2"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info Varian */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between w-full text-left">
        <div>
          <h3
            className={`font-judul text-left ${
              isStacked ? "text-xl" : "text-xl md:text-2xl"
            } text-tua mb-1.5`}
          >
            {product.name}
          </h3>
          <p
            className={`text-karamel text-xs sm:text-sm leading-relaxed mb-3 text-left ${
              isStacked ? "line-clamp-3" : "max-w-[55ch]"
            }`}
          >
            {product.description}
          </p>

          {/* Size Chips if multi-size */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="mb-3 flex justify-start">
              <SizeChips
                sizes={product.sizes}
                selectedSize={selectedSizeLabel}
                onSelectSize={setSelectedSizeLabel}
                namePrefix={`card-${product.id}`}
              />
            </div>
          )}
        </div>

        {/* Harga & Tombol Pesan */}
        <div
          className="pt-3 border-t border-tua/15 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mt-auto w-full"
        >
          <div className="text-left">
            <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-karamel font-medium">
              Harga ({selectedSizeLabel || "Kemasan"}):
            </span>
            <span className="font-judul text-xl sm:text-2xl text-tua tabular-nums font-bold block leading-tight">
              {displayPrice}
            </span>
          </div>

          <Link
            to={`/pesan?varian=${product.id}`}
            className="btn-press inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-tua text-susu font-semibold text-xs sm:text-sm hover:bg-karamel transition-colors shadow-xs w-full sm:w-auto"
          >
            <span>Pesan varian ini</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
