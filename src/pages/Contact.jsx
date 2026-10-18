import React from "react";
import { site } from "../content/site";
import { directChatLink } from "../lib/whatsapp";
import {
  IconWhatsApp,
  IconInstagram,
  IconTikTok,
  IconYouTube,
  IconShopee,
  IconMapPin,
  IconClock
} from "../components/icons/Icons";

export default function Contact() {
  const isPhoneReady = site.phone && !site.phone.includes("TODO");

  return (
    <div className="bg-keju doodle-pattern min-h-screen py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Halaman */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-karamel block mb-1">
            Informasi Layanan
          </span>
          <h1 className="font-judul text-3xl sm:text-4xl md:text-5xl text-tua mb-3">
            Kontak & Lokasi
          </h1>
          <p className="text-sm sm:text-base text-karamel">
            Hubungi kami untuk pertanyaan produk, kemitraan, pesanan khusus, atau informasi lokasi produksi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kartu Kontak Cepat */}
          <div className="bg-susu frame-kemasan rounded-sm p-6 sm:p-8 space-y-6">
            <h2 className="font-judul text-2xl text-tua border-b border-tua/15 pb-3">
              Hubungi Kami Langsung
            </h2>

            {/* Chat WhatsApp Langsung */}
            <div className="p-4 rounded-md bg-mentega/40 border border-tua/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tua text-mentega flex items-center justify-center shrink-0">
                  <IconWhatsApp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-tua">WhatsApp Admin</h3>
                  <p className="text-xs text-karamel">Respon cepat setiap hari</p>
                </div>
              </div>

              {isPhoneReady ? (
                <a
                  href={directChatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press w-full py-2.5 px-4 rounded-full bg-tua text-susu font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-karamel transition-colors shadow-xs"
                >
                  <IconWhatsApp className="w-4 h-4 text-keju" />
                  <span>Chat Langsung via WhatsApp</span>
                </a>
              ) : (
                <p className="text-xs text-karamel italic bg-susu p-2 rounded-xs border border-tua/10">
                  Nomor WhatsApp admin sedang dalam konfirmasi owner.
                </p>
              )}
            </div>

            {/* Jam Layanan */}
            <div className="flex items-start gap-3 text-sm text-tua">
              <IconClock className="w-5 h-5 text-karamel shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Jam Layanan:</span>
                <span className="text-xs sm:text-sm text-karamel">{site.operatingHours}</span>
              </div>
            </div>

            {/* Media Sosial & Kanal Resmi */}
            <div>
              <span className="block text-xs uppercase font-bold tracking-wider text-karamel mb-3">
                Kanal Resmi Kami:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-md border border-tua/20 bg-mentega/20 hover:bg-mentega/50 text-tua text-xs font-semibold transition-colors"
                >
                  <IconInstagram className="w-4 h-4 text-tua" />
                  <span>Instagram Resmi</span>
                </a>

                {site.socials.tiktok && !site.socials.tiktok.includes("TODO") && (
                  <a
                    href={site.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-md border border-tua/20 bg-mentega/20 hover:bg-mentega/50 text-tua text-xs font-semibold transition-colors"
                  >
                    <IconTikTok className="w-4 h-4 text-tua" />
                    <span>TikTok Resmi</span>
                  </a>
                )}

                {site.socials.youtube && !site.socials.youtube.includes("TODO") && (
                  <a
                    href={site.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-md border border-tua/20 bg-mentega/20 hover:bg-mentega/50 text-tua text-xs font-semibold transition-colors"
                  >
                    <IconYouTube className="w-4 h-4 text-tua" />
                    <span>YouTube Resmi</span>
                  </a>
                )}

                {site.socials.shopee && !site.socials.shopee.includes("TODO") && (
                  <a
                    href={site.socials.shopee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-md border border-tua/20 bg-mentega/20 hover:bg-mentega/50 text-tua text-xs font-semibold transition-colors"
                  >
                    <IconShopee className="w-4 h-4 text-tua" />
                    <span>Shopee Lestari</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Kartu Lokasi & Peta */}
          <div className="bg-susu frame-kemasan rounded-sm p-6 sm:p-8 space-y-6">
            <h2 className="font-judul text-2xl text-tua border-b border-tua/15 pb-3">
              Lokasi Produksi
            </h2>

            <div className="flex items-start gap-3">
              <IconMapPin className="w-6 h-6 text-karamel shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm sm:text-base text-tua block">
                  {site.name}
                </span>
                <p className="text-xs sm:text-sm text-karamel mt-0.5 leading-relaxed">
                  {site.address}
                </p>
              </div>
            </div>

            {/* Peta visual mock / Google Maps Button */}
            <div className="w-full aspect-16/9 bg-mentega/30 rounded-md border-2 border-tua overflow-hidden relative flex flex-col items-center justify-center p-6 text-center shadow-inner">
              <IconMapPin className="w-8 h-8 text-tua mb-2 animate-bounce" />
              <h4 className="font-judul text-base text-tua mb-1">Purwokerto, Banyumas</h4>
              <p className="text-xs text-karamel max-w-xs mb-4">
                Buka rute navigasi langsung di Google Maps menuju lokasi kami
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press px-5 py-2.5 rounded-full bg-tua text-susu font-bold text-xs hover:bg-karamel transition-colors shadow-xs"
              >
                Buka di Google Maps
              </a>
            </div>

            <p className="text-[11px] text-karamel text-center">
              Untuk kunjungan langsung atau pengambilan pesanan di tempat, mohon konfirmasi terlebih dahulu melalui WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
