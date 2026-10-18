import React from "react";

/**
 * Komponen Animasi Looping Berjalan (Infinite Marquee)
 * Menampilkan satu buah makaroni untuk tiap varian rasa berjalan dari kanan ke kiri.
 */
const variantPieces = [
  {
    id: "original",
    name: "Original Keju",
    img: "/images/piece_original.webp",
    tag: "Gurih Keju"
  },
  {
    id: "pedas_gurih",
    name: "Pedas Gurih",
    img: "/images/piece_pedas_gurih.webp",
    tag: "Pedas Cabai"
  },
  {
    id: "balado",
    name: "Balado Spesial",
    img: "/images/piece_balado.webp",
    tag: "Manis Pedas"
  },
  {
    id: "jagung_bakar",
    name: "Jagung Bakar",
    img: "/images/piece_jagung_bakar.webp",
    tag: "Aroma Bakar"
  },
  {
    id: "cokelat",
    name: "Cokelat Manis",
    img: "/images/piece_cokelat.webp",
    tag: "Cokelat Legit"
  },
  {
    id: "daun_seledri",
    name: "Keju Seledri",
    img: "/images/piece_daun_seledri.webp",
    tag: "Harum Seledri"
  }
];

export default function MacaroniTicker() {
  // Duplikasi 4x sehingga 1 siklus pergeseran (-50%) mencakup 2 putaran penuh (12 item)
  // Menjamin loop 100% mulus tanpa jeda di resolusi mobile hingga ultra-wide desktop
  const marqueeList = [
    ...variantPieces,
    ...variantPieces,
    ...variantPieces,
    ...variantPieces
  ];

  return (
    <div className="relative w-full overflow-hidden bg-tua text-susu py-3.5 border-y-2 border-tua/40 shadow-inner select-none">
      {/* Tepi Bergerigi di atas pita (Scallop Divider) */}
      <div className="scallop-divider text-tua absolute -top-4 left-0 right-0 z-20 pointer-events-none" />

      {/* Kontainer Marquee Berjalan dari Kanan ke Kiri */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {marqueeList.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-3 px-6 sm:px-8 shrink-0 group cursor-default"
          >
            {/* Foto 1 Buah Makaroni Asli Varian */}
            <div className="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center shrink-0">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)] group-hover:scale-115 transition-transform duration-200"
                width="48"
                height="56"
              />
            </div>

            {/* Nama Varian */}
            <span className="font-judul text-base sm:text-lg text-mentega whitespace-nowrap group-hover:text-keju transition-colors">
              {item.name}
            </span>

            {/* Pemisah Antar Varian */}
            <span className="text-keju/50 text-xs pl-5 sm:pl-7 select-none font-bold" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>

      {/* Tepi Bergerigi di bawah pita (Scallop Divider) */}
      <div className="scallop-divider-top text-tua absolute -bottom-4 left-0 right-0 z-20 pointer-events-none" />
    </div>
  );
}
