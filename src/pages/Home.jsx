import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { site } from "../content/site";
import { products } from "../content/products";
import { orderSteps } from "../content/steps";
import { galleryItems } from "../content/gallery";
import Badge from "../components/Badge";
import ProductCard from "../components/ProductCard";
import MacaroniTicker from "../components/MacaroniTicker";
import { initHeroAnimation } from "../animations/heroIntro";
import { IconArrowRight, IconWhatsApp, IconMapPin, IconClock } from "../components/icons/Icons";

export default function Home() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const jargonRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);

  // Animasi Typing Jargon
  const fullJargon = "Gurihnya sampai ke hati";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedText(fullJargon);
      return;
    }

    let timer;
    if (!isDeleting && typedText.length < fullJargon.length) {
      timer = setTimeout(() => {
        setTypedText(fullJargon.slice(0, typedText.length + 1));
      }, 75);
    } else if (!isDeleting && typedText.length === fullJargon.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(fullJargon.slice(0, typedText.length - 1));
      }, 35);
    } else if (isDeleting && typedText.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting]);

  useGSAP(
    () => {
      initHeroAnimation(heroRef, {
        badge: badgeRef.current,
        titleLines: [jargonRef.current, line1Ref.current, line2Ref.current, line3Ref.current, subRef.current],
        actions: actionsRef.current
      });
    },
    { scope: heroRef }
  );

  const featuredProducts = products.slice(0, 3);
  const previewGallery = galleryItems.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (Kuning Keju) */}
      <section
        ref={heroRef}
        className="relative bg-keju doodle-pattern py-10 md:py-16 lg:py-20 border-b-2 border-tua/15 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-10">
            {/* Teks Hero */}
            <div className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none">
              <h1 className="font-judul text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-tua leading-[1.08] tracking-tight mb-4">
                <span
                  ref={jargonRef}
                  className="block mb-1 sm:mb-1.5 min-h-[1.5rem] sm:min-h-[1.75rem]"
                >
                  <span className="inline-flex items-center font-isi font-extrabold text-xs sm:text-sm md:text-base tracking-widest uppercase text-karamel select-none">
                    <span>{typedText}</span>
                    <span
                      className="inline-block w-[2px] h-[1.15em] bg-karamel ml-1 align-middle animate-blink"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <span ref={line1Ref} className="block">Makaroni Keju</span>
                <span ref={line2Ref} className="block">Lestari Purwokerto,</span>
                <span ref={line3Ref} className="block text-karamel">sejak 2012.</span>
              </h1>

              <p
                ref={subRef}
                className="text-base sm:text-lg md:text-xl text-karamel font-medium max-w-[50ch] mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Renyah, gurih, kejunya terasa. Dibuat dengan resep otentik pilihan semua kalangan.
              </p>

              <div
                ref={actionsRef}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
              >
                <Link
                  to="/pesan"
                  className="btn-press w-full sm:w-auto px-7 py-3.5 rounded-full bg-tua text-susu font-bold text-base hover:bg-karamel transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <IconWhatsApp className="w-5 h-5 text-keju" />
                  <span>Pesan lewat WhatsApp</span>
                </Link>

                <Link
                  to="/produk"
                  className="btn-press w-full sm:w-auto px-7 py-3.5 rounded-full border-2 border-tua bg-susu/60 hover:bg-susu text-tua font-bold text-base transition-colors flex items-center justify-center gap-2"
                >
                  <span>Lihat produk</span>
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Foto Kemasan Produk Hero (Sejajar dengan batas kanan navbar) */}
            <div
              ref={badgeRef}
              className="flex-1 shrink-0 flex items-center justify-center lg:justify-end relative w-full lg:w-auto mt-2 lg:mt-0"
            >
              <div className="relative flex items-center justify-center lg:justify-end">
                {/* Soft ambient depth halus di belakang produk */}
                <div
                  className="absolute inset-4 md:inset-0 rounded-full bg-tua/10 blur-3xl -z-10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Foto Kemasan */}
                <img
                  src="/images/produk_kemasan_lestari.webp"
                  alt="Kemasan Produk Makaroni Keju Lestari Purwokerto"
                  className="w-72 sm:w-[400px] md:w-[460px] lg:w-[500px] xl:w-[540px] max-h-[500px] lg:max-h-[560px] object-contain hover:scale-105 transition-transform duration-300 relative z-10 drop-shadow-[0_25px_35px_rgba(58,30,13,0.34)] drop-shadow-[0_8px_14px_rgba(58,30,13,0.18)]"
                  width="540"
                  height="560"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Ticker Animasi Looping Makaroni Tiap Varian (Kanan ke Kiri) */}
      <MacaroniTicker />

      {/* 2. RINGKASAN PRODUK UNGGULAN (Kuning Mentega) */}
      <section className="bg-mentega py-14 md:py-20 border-b-2 border-tua/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
                Pilihan Rasa Favorit
              </span>
              <h2 className="font-judul text-2xl sm:text-3xl md:text-4xl text-tua">
                Varian Makaroni Keju
              </h2>
            </div>
            <Link
              to="/produk"
              className="btn-press inline-flex items-center gap-1.5 text-sm font-bold text-tua hover:text-karamel underline underline-offset-4"
            >
              <span>Lihat semua rasa</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} layout="stacked" />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/produk"
              className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-tua text-susu font-bold text-sm hover:bg-karamel transition-colors shadow-xs"
            >
              <span>Jelajahi Seluruh Varian ({products.length} Rasa)</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CARA PEMESANAN (Cokelat Tua) */}
      <section className="bg-tua text-susu py-14 md:py-20 border-b-2 border-mentega/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-mentega block mb-1">
              Mudah & Cepat
            </span>
            <h2 className="font-judul text-2xl sm:text-3xl md:text-4xl text-susu">
              Cara Memesan Makaroni
            </h2>
            <p className="text-sm text-susu/70 mt-2">
              Tanpa perlu daftar akun atau instal aplikasi khusus, cukup 4 langkah sederhana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orderSteps.map((step) => (
              <div
                key={step.step}
                className="bg-susu/5 border border-susu/15 rounded-md p-6 relative flex flex-col justify-between hover:bg-susu/10 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-keju text-tua font-judul text-lg font-bold flex items-center justify-center mb-4 shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="font-judul text-lg text-mentega mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-susu/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/pesan"
              className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-keju text-tua font-bold text-base hover:bg-mentega transition-colors shadow-md"
            >
              <IconWhatsApp className="w-5 h-5 text-tua" />
              <span>Buka Form Pemesanan</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CUPLIKAN GALERI (Kuning Keju) */}
      <section className="bg-keju py-14 md:py-20 border-b-2 border-tua/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
                Galeri Foto
              </span>
              <h2 className="font-judul text-2xl sm:text-3xl md:text-4xl text-tua">
                Kelezatan Makaroni Lestari
              </h2>
            </div>
            <Link
              to="/galeri"
              className="btn-press inline-flex items-center gap-1.5 text-sm font-bold text-tua hover:text-karamel underline underline-offset-4"
            >
              <span>Buka galeri lengkap</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {previewGallery.map((item) => (
              <div
                key={item.id}
                className="bg-susu border-2 border-tua rounded-sm overflow-hidden shadow-xs group flex flex-col justify-between"
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
                <p className="text-xs sm:text-sm font-bold text-tua text-center py-2.5 px-2 truncate">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BLOK KONTAK SINGKAT (Kuning Mentega) */}
      <section className="bg-mentega py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-judul text-2xl sm:text-3xl text-tua mb-3">
            Ingin Bertanya Langsung atau Pesan Grosir?
          </h2>
          <p className="text-sm sm:text-base text-karamel mb-6 max-w-xl mx-auto leading-relaxed">
            Kami siap melayani pesanan cemilan harian, oleh-oleh khas Purwokerto, hingga pesanan partai besar untuk hajatan dan acara Anda.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/kontak"
              className="btn-press px-6 py-3 rounded-full bg-tua text-susu font-bold text-sm hover:bg-karamel transition-colors"
            >
              Informasi Kontak & Lokasi
            </Link>
            <Link
              to="/pesan"
              className="btn-press px-6 py-3 rounded-full border-2 border-tua bg-susu text-tua font-bold text-sm hover:bg-mentega transition-colors"
            >
              Form Pesan Cepat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
