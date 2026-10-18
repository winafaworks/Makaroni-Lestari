import React from "react";
import { Link } from "react-router-dom";
import { products } from "../content/products";
import { site } from "../content/site";
import ProductCard from "../components/ProductCard";
import { IconWhatsApp, IconArrowRight } from "../components/icons/Icons";

export default function Products() {
  return (
    <div className="bg-keju doodle-pattern min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Halaman */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
            Katalog Lengkap
          </span>
          <h1 className="font-judul text-3xl sm:text-4xl md:text-5xl text-tua mb-3">
            Daftar Varian & Harga
          </h1>
          <p className="text-sm sm:text-base text-karamel leading-relaxed">
            Semua varian dibuat dari makaroni pilihan dan keju berkualitas. Pilih rasa kesukaan Anda dan klik tombol pesan untuk order langsung ke WhatsApp kami.
          </p>
        </div>

        {/* Daftar Kartu Produk (Grid 3 Kolom: 3 - 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              layout="stacked"
            />
          ))}
        </div>

        {/* Banner Menuju Halaman Kemasan Lainnya */}
        <div className="mt-16 p-6 sm:p-8 rounded-sm bg-susu frame-kemasan border-2 border-tua shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-tua text-mentega inline-block mb-2">
              Koleksi Spesial
            </span>
            <h3 className="font-judul text-2xl text-tua mb-1">
              Mencari Kemasan Lainnya?
            </h3>
            <p className="text-xs sm:text-sm text-karamel leading-relaxed">
              Kami juga melayani pesanan hampers toples elegan, bouquet wisuda/ulang tahun, kemasan 5kg curah untuk hajatan, hingga pesanan custom reseller.
            </p>
          </div>
          <Link
            to="/kemasan-lainnya"
            className="btn-press shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tua text-susu font-bold text-sm hover:bg-karamel transition-colors shadow-xs w-full md:w-auto justify-center"
          >
            <span>Buka Kemasan Lainnya</span>
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
