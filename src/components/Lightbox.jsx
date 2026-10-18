import React, { useEffect } from "react";
import { IconClose } from "./icons/Icons";

/**
 * Modal Lightbox untuk Menampilkan Foto Resolusi Penuh
 * Mendukung tombol keyboard Esc dan tombol tutup 48px.
 */
export default function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Kunci scroll halaman belakang
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-tua/90 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Tampilan Foto"}
      onClick={onClose}
    >
      {/* Tombol Tutup Besar 48x48 */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup pratinjau"
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-susu text-tua hover:bg-mentega flex items-center justify-center cursor-pointer transition-colors shadow-md z-10"
      >
        <IconClose className="w-6 h-6" />
      </button>

      {/* Konten Foto */}
      <div
        className="max-w-3xl w-full bg-susu p-4 sm:p-6 rounded-sm border-2 border-tua shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xs border border-tua/20 bg-keju/20">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain max-h-[68vh]"
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-tua/15 pt-3">
          <div>
            <h3 className="font-judul text-lg sm:text-xl text-tua">{item.title}</h3>
            {item.caption && <p className="text-xs sm:text-sm text-karamel mt-0.5">{item.caption}</p>}
          </div>

          {(onPrev || onNext) && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {onPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-3 py-1.5 rounded-full bg-tua text-susu text-xs font-bold hover:bg-karamel"
                  aria-label="Foto sebelumnya"
                >
                  ← Sebelumnya
                </button>
              )}
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-3 py-1.5 rounded-full bg-tua text-susu text-xs font-bold hover:bg-karamel"
                  aria-label="Foto berikutnya"
                >
                  Berikutnya →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
