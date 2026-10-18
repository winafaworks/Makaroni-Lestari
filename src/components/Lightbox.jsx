import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { IconClose } from "./icons/Icons";

/**
 * Modal Lightbox untuk Menampilkan Foto Resolusi Penuh
 * Menggunakan createPortal ke document.body agar selalu berada tepat di tengah (center) viewport
 * dan tidak terpengaruh oleh transform atau scroll container halaman.
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

  if (!item || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-tua/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Tampilan Foto"}
      onClick={onClose}
    >
      {/* Tombol Tutup 44x44 di Sudut Layar */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup pratinjau"
        className="fixed top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 rounded-full bg-susu text-tua hover:bg-mentega border border-tua/30 flex items-center justify-center cursor-pointer transition-colors shadow-xl z-50 active:scale-95"
      >
        <IconClose className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Konten Kartu Foto - Presisi di Tengah Layar */}
      <div
        className="max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col bg-susu p-3.5 sm:p-5 rounded-2xl border-2 border-tua shadow-2xl relative my-auto animate-menu-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kontainer Foto */}
        <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden rounded-xl border border-tua/20 bg-keju/20">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain max-h-[58vh] sm:max-h-[64vh] rounded-lg"
          />
        </div>

        {/* Info & Navigasi */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-tua/15 pt-2.5 sm:pt-3">
          <div className="min-w-0">
            <h3 className="font-judul text-base sm:text-lg text-tua truncate">{item.title}</h3>
            {item.caption && (
              <p className="text-xs sm:text-sm text-karamel mt-0.5 line-clamp-2">{item.caption}</p>
            )}
          </div>

          {(onPrev || onNext) && (
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {onPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="btn-press px-3.5 py-1.5 rounded-full bg-tua text-susu text-xs font-bold hover:bg-karamel transition-colors"
                  aria-label="Foto sebelumnya"
                >
                  ← Sebelumnya
                </button>
              )}
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="btn-press px-3.5 py-1.5 rounded-full bg-tua text-susu text-xs font-bold hover:bg-karamel transition-colors"
                  aria-label="Foto berikutnya"
                >
                  Berikutnya →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
