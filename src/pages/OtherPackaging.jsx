import React, { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../content/site";
import { IconWhatsApp, IconArrowRight, IconCheck } from "../components/icons/Icons";

/**
 * Komponen Carousel Gambar Interaktif untuk Kemasan 250 Gram
 */
function Carousel250g({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-mentega/30 overflow-hidden border-b-2 border-tua select-none group">
      {/* Gambar Carousel Aktif */}
      <img
        src={images[currentIndex]}
        alt={`${title} - Foto ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        loading="lazy"
        width="600"
        height="450"
      />



      {/* Tombol Navigasi Sebelumnya */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Foto sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-susu/95 text-tua border-2 border-tua flex items-center justify-center hover:bg-mentega transition-all shadow-md cursor-pointer z-20 hover:scale-110 active:scale-95"
      >
        <span className="text-lg font-bold leading-none -ml-0.5">‹</span>
      </button>

      {/* Tombol Navigasi Berikutnya */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-susu/95 text-tua border-2 border-tua flex items-center justify-center hover:bg-mentega transition-all shadow-md cursor-pointer z-20 hover:scale-110 active:scale-95"
      >
        <span className="text-lg font-bold leading-none -mr-0.5">›</span>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-tua/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-susu/20">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Buka foto slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? "bg-mentega w-5"
                : "bg-susu/50 hover:bg-susu w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function OtherPackaging() {
  // Gambar-gambar kemasan 250 gram untuk carousel
  const carousel250gImages = [
    "/images/kemasan_lainnya/250gram.webp",
    "/images/kemasan_lainnya/250gram_1.webp",
    "/images/kemasan_lainnya/250gram_2.webp",
    "/images/kemasan_lainnya/250gram_3.webp"
  ];

  // Daftar kemasan lainnya
  const packagingList = [
    {
      id: "250gram",
      isCarousel: true,
      carouselImages: carousel250gImages,
      title: "Kemasan Pouch 200g - 250g",
      price: "27k",
      priceLabel: "Harga:",
      badge: "Porsi Jumbo",
      badgeColor: "bg-tua text-mentega",
      desc: "Kemasan pouch jumbo 200–250 gram dengan ziplock praktis. Porsi lebih puas, hemat, dan pas untuk stok camilan keluarga di rumah maupun suguhan santai.",
      features: [
        "Isi 200 - 250 gram (hampir 3x lipat kemasan reguler)",
        "Kemasan ziplock tebal kedap udara menjaga kerenyahan",
        "Tersedia lengkap dalam 6 pilihan varian rasa favorit",
        "Lebih hemat dan praktis untuk stok camilan"
      ],
      whatsappMsg: "Halo Lestari, saya tertarik dan ingin memesan Makaroni Keju Kemasan Pouch (27k)."
    },
    {
      id: "goodybag",
      isCarousel: false,
      image: "/images/kemasan_lainnya/goodybag.webp",
      title: "Kemasan Goodie Bag 700 Gram",
      price: "75k",
      priceLabel: "Harga:",
      badge: "Oleh-oleh Spesial",
      badgeColor: "bg-tua text-mentega",
      desc: "Paper bag kraft estetik dengan tali jinjing rami ramah lingkungan. Berisi 700 gram makaroni keju pilihan berlabel resmi Halal MUI. Sangat pantas dan berkesan untuk buah tangan atau bingkisan acara.",
      features: [
        "Isi bersih 700 gram — pas untuk buah tangan keluarga",
        "Paper bag kraft tebal & elegan dengan pegangan tali rami",
        "Tersedia aneka varian rasa favorit (Original, Jagung Bakar, Pedas, Balado, Cokelat)",
        "Sangat cocok untuk oleh-oleh khas, souvenir seminar, atau gathering"
      ],
      whatsappMsg: "Halo Lestari, saya tertarik dan ingin memesan Kemasan Goodie Bag 700 Gram (75k)."
    },
    {
      id: "toples",
      isCarousel: false,
      image: "/images/kemasan_lainnya/toples.webp",
      title: "Kemasan Toples Premium",
      price: "37k",
      priceLabel: "Harga:",
      badge: "Kedap Udara",
      badgeColor: "bg-tua text-mentega",
      desc: "Toples tabung bening kedap udara eksklusif berhias label stempel resmi Makaroni Lestari. Higienis, sangat cantik untuk ditaruh di meja tamu, dan praktis dibawa bepergian.",
      features: [
        "Toples bening kedap udara menjaga tekstur super renyah",
        "Tampilan rapi dan elegan untuk suguhan meja ruang tamu",
        "Bebas pilih varian rasa kesukaan Anda",
        "Mudah dibuka-tutup kembali tanpa khawatir melempem"
      ],
      whatsappMsg: "Halo Lestari, saya tertarik dengan Kemasan Toples Premium Makaroni Keju (37k)."
    },
    {
      id: "hampers",
      isCarousel: false,
      image: "/images/kemasan_lainnya/hampers.webp",
      title: "Hampers Spesial & Hari Raya",
      price: "Hubungi Kami",
      priceLabel: "Harga Paket:",
      badge: "Kado & Idul Fitri",
      badgeColor: "bg-cabai text-susu",
      desc: "Paket bingkisan toples cantik berhias pita satin eksklusif dan kartu ucapan. Pilihan kado yang berkesan untuk hantaran Idul Fitri, silaturahmi keluarga, bingkisan kantor, maupun relasi bisnis.",
      features: [
        "Kemasan hampers eksklusif siap kirim",
        "Bisa memilih kombinasi 2 hingga 4 toples aneka rasa",
        "Sudah termasuk kartu ucapan selamat & hiasan pita cantik",
        "Cocok untuk hantaran Idul Fitri, kado natal, dan syukuran"
      ],
      whatsappMsg: "Halo Lestari, saya ingin bertanya dan memesan Paket Hampers Makaroni Keju."
    },
    {
      id: "bouquet",
      isCarousel: false,
      image: "/images/kemasan_lainnya/bouqet_makaroni.webp",
      title: "Bouquet Makaroni (Wisuda & Hadiah)",
      price: "50k",
      priceLabel: "Harga:",
      badge: "Kado Kreatif",
      badgeColor: "bg-tua text-keju",
      desc: "Buket buatan tangan estetik dengan wrapping kertas buket floral dan pita satin. Hadiah kekinian yang unik, lezat, dan berkesan untuk momen wisuda, kelulusan, sidang skripsi, atau ulang tahun sahabat.",
      features: [
        "Buket kreatif pengganti bunga segar yang lebih berkesan & lezat",
        "Wrapping buket rapi dengan kertas buket premium",
        "Bebas memilih varian rasa favorit yang dirangkai",
        "Bisa request kartu ucapan selamat wisuda / ultah"
      ],
      whatsappMsg: "Halo Lestari, saya ingin memesan Bouquet Makaroni Keju (50k)."
    },
    {
      id: "2kg",
      isCarousel: false,
      image: "/images/kemasan_lainnya/2kg.webp",
      title: "Kemasan Curah 2kg (Kiloan Acara)",
      price: "200k",
      priceLabel: "Harga (2 kg):",
      badge: "Kiloan Hemat",
      badgeColor: "bg-tua text-keju",
      desc: "Kemasan plastik tebal bersegel rapi ukuran 2 kilogram siap saji. Pilihan tepat untuk suguhan acara arisan keluarga, syukuran, isian toples rumah, maupun untuk dikemas ulang oleh reseller.",
      features: [
        "Isi bersih 2 kilogram makaroni keju gurih renyah",
        "Kemasan plastik tebal higienis menjaga mutu kerenyahan",
        "Harga kiloan lebih hemat dan bersahabat",
        "Cocok untuk konsumsi keluarga besar, arisan, atau jualan ulang"
      ],
      whatsappMsg: "Halo Lestari, saya ingin memesan Makaroni Kemasan Curah 2kg (200k)."
    },
    {
      id: "5kg",
      isCarousel: false,
      image: "/images/kemasan_lainnya/5kg.webp",
      title: "Kemasan Curah 5kg (Grosir & Hajatan)",
      price: "500k",
      priceLabel: "Harga (5 kg):",
      badge: "Harga Grosir",
      badgeColor: "bg-tua text-mentega",
      desc: "Pilihan curah jumbo 5 kilogram langsung dari dapur produksi kami. Solusi paling hemat untuk katering pesta, konsumsi hajatan pernikahan, arisan besar, serta suplai reseller makanan ringan.",
      features: [
        "Isi jumbo 5 kilogram untuk kebutuhan skala besar",
        "Harga grosir termurah langsung dari produsen",
        "Plastik tebal higienis menjaga kerenyahan optimal",
        "Bisa dipesan rutin untuk katering, pesta hajatan, atau reseller"
      ],
      whatsappMsg: "Halo Lestari, saya ingin memesan Makaroni Kemasan Curah 5kg (500k)."
    }
  ];

  return (
    <div className="bg-keju doodle-pattern min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Halaman */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
            Koleksi Spesial & Grosir
          </span>
          <h1 className="font-judul text-3xl sm:text-4xl md:text-5xl text-tua mb-3">
            Kemasan Lainnya
          </h1>
          <p className="text-sm sm:text-base text-karamel leading-relaxed">
            Selain kemasan pouch reguler 90 gram, kami menghadirkan variasi pouch 200g/250g, goodie bag 700 gram, toples elegan, hampers hari raya, bouquet wisuda, hingga kemasan curah 2kg dan 5kg.
          </p>
        </div>

        {/* Grid Kartu Kemasan Lainnya (3 Kolom per Baris di Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {packagingList.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="frame-kemasan rounded-sm overflow-hidden flex flex-col justify-between shadow-xs group"
            >
              {/* Bagian Media: Carousel atau Single Image */}
              {item.isCarousel ? (
                <Carousel250g
                  images={item.carouselImages}
                  title={item.title}
                />
              ) : (
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-mentega/30 border-b-2 border-tua shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="600"
                    height="450"
                  />
                  {item.isBestSeller && (
                    <span className="absolute top-3.5 right-3.5 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-tua text-mentega border border-mentega/40 shadow-md">
                      Best Seller
                    </span>
                  )}
                </div>
              )}

              {/* Konten Detail Kemasan */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <h2 className="font-judul text-xl text-tua">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-karamel text-xs sm:text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Poin Keunggulan */}
                  <ul className="space-y-1.5 mb-6 text-xs text-tua/90">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <IconCheck className="w-4 h-4 text-cabai shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Harga & Tombol Pesan via WhatsApp */}
                <div className="pt-4 border-t border-tua/15 mt-auto flex items-end justify-between gap-3">
                  <div>
                    <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-karamel font-medium">
                      {item.priceLabel || "Harga:"}
                    </span>
                    <span className="font-judul text-2xl text-tua tabular-nums font-bold block leading-tight">
                      {item.price}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${site.phone}?text=${encodeURIComponent(item.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press py-2 px-3.5 sm:px-4 rounded-full bg-tua text-susu font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-karamel transition-colors shadow-xs shrink-0"
                  >
                    <IconWhatsApp className="w-4 h-4 text-keju" />
                    <span>Pesan via WA</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Navigasi ke Pouch Reguler 90g */}
        <div className="p-8 rounded-sm bg-susu frame-kemasan text-center max-w-2xl mx-auto space-y-4">
          <h3 className="font-judul text-2xl text-tua">
            Mencari Kemasan Pouch Reguler 90g?
          </h3>
          <p className="text-xs sm:text-sm text-karamel leading-relaxed">
            Lihat 6 pilihan rasa makaroni keju otentik kemasan pouch praktis 90 gram (Original, Pedas Gurih, Balado, Jagung Bakar, Cokelat, dan Seledri).
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/produk"
              className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tua text-susu font-bold text-sm hover:bg-karamel transition-colors shadow-xs"
            >
              <span>Buka Katalog Pouch 90g</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pesan"
              className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-tua bg-mentega text-tua font-bold text-sm hover:bg-keju transition-colors"
            >
              <span>Form Order Cepat</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
