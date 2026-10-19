import React from "react";
import OrderForm from "../components/OrderForm";
import { orderSteps } from "../content/steps";
import { site } from "../content/site";
import { IconShopee } from "../components/icons/Icons";

export default function Order() {
  const hasShopee = site.socials?.shopee && !site.socials.shopee.includes("TODO");

  return (
    <div className="bg-keju doodle-pattern min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Halaman */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
            Order Cepat
          </span>
          <h1 className="font-judul text-3xl sm:text-4xl text-tua mb-2">
            Pesan Makaroni Keju
          </h1>
          <p className="text-sm text-karamel">
            Isi form di bawah ini untuk memesan langsung ke admin WhatsApp Makaroni Keju Lestari.
          </p>
        </div>

        {/* 1. Form Pemesanan */}
        <div className="mb-16">
          <OrderForm />
        </div>

        {/* 2. Langkah Cara Pemesanan */}
        <div className="max-w-[620px] mx-auto bg-susu/80 border-2 border-tua p-6 sm:p-8 rounded-sm">
          <div className="text-center mb-6">
            <h2 className="font-judul text-xl sm:text-2xl text-tua">
              Alur Pemesanan Mudah
            </h2>
            <p className="text-xs sm:text-sm text-karamel mt-1">
              Bagaimana pesanan Anda diproses dari awal hingga sampai ke tangan Anda
            </p>
          </div>

          <ol className="space-y-4">
            {orderSteps.map((item) => (
              <li key={item.step} className="flex items-start gap-4 p-3 rounded-md bg-mentega/20 border border-tua/10">
                <div className="w-8 h-8 rounded-full bg-tua text-susu font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 font-judul">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-tua">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-karamel mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Tautan Shopee Alternatif */}
          {hasShopee && (
            <div className="mt-8 pt-6 border-t border-tua/15 text-center">
              <p className="text-xs text-karamel mb-2">
                Lebih suka berbelanja melalui marketplace online?
              </p>
              <a
                href={site.socials.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mentega text-tua border border-tua font-bold text-xs sm:text-sm hover:bg-keju transition-colors"
              >
                <IconShopee className="w-4 h-4 text-cabai" />
                <span>Pesan lewat Shopee</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
