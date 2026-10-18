import React from "react";

/**
 * Lencana Logo Resmi Makaroni Keju Lestari (Est. 2012)
 * Menggunakan logo asli transparan dari owner.
 */
export default function Badge({ size = "lg", className = "" }) {
  const isLarge = size === "lg";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        isLarge ? "w-40 h-40 md:w-52 md:h-52" : "w-11 h-11"
      } ${className}`}
      aria-label="Logo Resmi Makaroni Keju Lestari Est. 2012"
    >
      <img
        src="/images/logo_makaroni_lestari.webp"
        alt="Logo Makaroni Keju Lestari"
        className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-200"
        width={isLarge ? "208" : "44"}
        height={isLarge ? "208" : "44"}
      />
    </div>
  );
}
