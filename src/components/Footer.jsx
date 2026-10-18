import React from "react";
import { Link } from "react-router-dom";
import { site } from "../content/site";
import { products } from "../content/products";
import Badge from "./Badge";
import {
  IconInstagram,
  IconTikTok,
  IconYouTube,
  IconShopee,
  IconWhatsApp,
  IconMapPin
} from "./icons/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tua text-susu border-t-4 border-mentega relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Kolom 1: Identitas & Lencana */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Badge size="sm" />
              <div>
                <span className="font-judul text-lg sm:text-xl text-mentega block leading-none">
                  {site.name}
                </span>
                <span className="text-[10px] text-susu/70 tracking-widest uppercase mt-0.5 block">
                  Purwokerto • Est. {site.yearEstablished}
                </span>
              </div>
            </div>
            <p className="text-xs text-susu/75 leading-relaxed max-w-sm">
              Camilan makaroni keju renyah, gurih, dan lezat khas Purwokerto. Menemani momen santai keluarga dan teman sejak 2012.
            </p>
          </div>

          {/* Kolom 2: Menu Navigasi */}
          <div className="space-y-2.5">
            <h4 className="font-judul text-sm sm:text-base text-mentega">Menu</h4>
            <ul className="space-y-1.5 text-xs text-susu/75">
              <li>
                <Link to="/" className="hover:text-mentega transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-mentega transition-colors">
                  Varian Produk & Harga
                </Link>
              </li>
              <li>
                <Link to="/kemasan-lainnya" className="hover:text-mentega transition-colors">
                  Kemasan Lainnya
                </Link>
              </li>
              <li>
                <Link to="/pesan" className="hover:text-mentega transition-colors">
                  Pemesanan WhatsApp
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="hover:text-mentega transition-colors">
                  Tentang Lestari
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-mentega transition-colors">
                  Galeri Foto
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-mentega transition-colors">
                  Kontak & Lokasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Varian Rasa */}
          <div className="space-y-2.5">
            <h4 className="font-judul text-sm sm:text-base text-mentega">Varian Rasa</h4>
            <ul className="space-y-1.5 text-xs text-susu/75">
              {products.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/pesan?varian=${item.id}`}
                    className="hover:text-mentega transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{item.name}</span>
                    {item.isBestSeller && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-mentega/20 text-mentega border border-mentega/30">
                        Favorit
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak & Kanal Sosial */}
          <div className="space-y-2.5">
            <h4 className="font-judul text-sm sm:text-base text-mentega">Hubungi Kami</h4>
            <p className="text-xs text-susu/75 flex items-start gap-2">
              <IconMapPin className="w-4 h-4 text-mentega shrink-0 mt-0.5" />
              <span>{site.address}</span>
            </p>
            <p className="text-[11px] text-susu/65">
              Jam Layanan: {site.operatingHours}
            </p>

            <div className="pt-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-susu/60 block mb-2">
                Kanal Resmi:
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Makaroni Keju Lestari"
                  className="w-8 h-8 rounded-full bg-susu/10 hover:bg-mentega hover:text-tua text-susu flex items-center justify-center transition-colors"
                >
                  <IconInstagram className="w-4 h-4" />
                </a>

                {/* TikTok (bila bukan TODO) */}
                {site.socials.tiktok && !site.socials.tiktok.includes("TODO") && (
                  <a
                    href={site.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok Makaroni Keju Lestari"
                    className="w-8 h-8 rounded-full bg-susu/10 hover:bg-mentega hover:text-tua text-susu flex items-center justify-center transition-colors"
                  >
                    <IconTikTok className="w-4 h-4" />
                  </a>
                )}

                {/* Shopee (bila bukan TODO) */}
                {site.socials.shopee && !site.socials.shopee.includes("TODO") && (
                  <a
                    href={site.socials.shopee}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Shopee Makaroni Keju Lestari"
                    className="w-8 h-8 rounded-full bg-susu/10 hover:bg-mentega hover:text-tua text-susu flex items-center justify-center transition-colors"
                  >
                    <IconShopee className="w-4 h-4" />
                  </a>
                )}

                {/* WhatsApp */}
                {site.phone && !site.phone.includes("TODO") && (
                  <a
                    href={`https://wa.me/${site.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Makaroni Keju Lestari"
                    className="w-8 h-8 rounded-full bg-susu/10 hover:bg-mentega hover:text-tua text-susu flex items-center justify-center transition-colors"
                  >
                    <IconWhatsApp className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hak Cipta & Informasi Footer */}
        <div className="mt-10 pt-5 border-t border-susu/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-susu/60 pb-safe">
          <p>© {currentYear} {site.name}. Seluruh hak cipta dilindungi.</p>
          <p className="tracking-widest uppercase text-[10px] text-susu/50">GURIHNYA SAMPAI KE HATI</p>
        </div>
      </div>
    </footer>
  );
}
