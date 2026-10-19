import React from "react";
import { site } from "../content/site";
import Badge from "../components/Badge";

export default function About() {
  return (
    <div className="bg-keju doodle-pattern min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Halaman */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
            Mengenal Kami
          </span>
          <h1 className="font-judul text-3xl sm:text-4xl md:text-5xl text-tua mb-3">
            Tentang Makaroni Keju Lestari
          </h1>
          <p className="text-sm sm:text-base text-karamel">
            Camilan renyah berpadu gurihnya keju khas Purwokerto sejak tahun 2012.
          </p>
        </div>

        {/* Kartu Profil Utama (Satu Kolom Bacaan 62ch) */}
        <div className="bg-susu frame-kemasan rounded-sm p-6 sm:p-10 shadow-sm max-w-[62ch] mx-auto">
          {/* Logo Resmi Makaroni Keju Lestari */}
          <div className="w-full flex justify-center mb-8">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-mentega/40 p-2.5 border-2 border-tua overflow-hidden shadow-md flex items-center justify-center">
              <img
                src="/images/logo_makaroni_lestari.webp"
                alt="Logo Resmi Makaroni Keju Lestari Purwokerto"
                className="w-full h-full object-contain drop-shadow-xs hover:scale-105 transition-transform duration-300"
                width="224"
                height="224"
              />
            </div>
          </div>

          {/* Penanda Tahun Berdiri 2012 */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px bg-tua/20 flex-1"></div>
            <div className="px-4 py-1.5 rounded-full bg-mentega border border-tua font-judul text-tua text-sm sm:text-base font-bold shadow-xs">
              Est. {site.yearEstablished} Purwokerto
            </div>
            <div className="h-px bg-tua/20 flex-1"></div>
          </div>

          {/* Cerita Usaha */}
          <div className="space-y-5 text-tua/90 text-sm sm:text-base leading-relaxed">
            {site.story.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Nilai Produk */}
          <div className="mt-10 pt-6 border-t border-tua/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-mentega/30 border border-tua/15">
              <h4 className="font-judul text-base text-tua mb-1">🧀 Rasa Keju Otentik</h4>
              <p className="text-xs text-karamel leading-relaxed">
                Rasa gurih keju yang pas di lidah, tidak berlebihan, dan gurih sampai gigitan terakhir.
              </p>
            </div>
            <div className="p-4 rounded-md bg-mentega/30 border border-tua/15">
              <h4 className="font-judul text-base text-tua mb-1">✨ Selalu Renyah</h4>
              <p className="text-xs text-karamel leading-relaxed">
                Diproduksi dengan teknik penggorengan dan pengemasan higienis agar kerenyahan terjaga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
