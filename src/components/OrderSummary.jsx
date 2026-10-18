import React from "react";
import { IconWhatsApp, IconArrowRight } from "./icons/Icons";

/**
 * Ringkasan Pesanan Setelah Tombol WhatsApp Diklik
 * Mengingatkan pembeli untuk menekan tombol 'Kirim' di WhatsApp dan tautan cadangan.
 */
export default function OrderSummary({ sentData, onReset }) {
  const { url, values, variantName } = sentData;

  return (
    <div className="bg-mentega/40 border-2 border-tua p-6 rounded-md space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-tua text-mentega flex items-center justify-center shrink-0">
          <IconWhatsApp className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-judul text-lg text-tua">Pesan WhatsApp Disiapkan!</h4>
          <p className="text-xs text-karamel">Langkah terakhir ada di aplikasi WhatsApp Anda</p>
        </div>
      </div>

      {/* Reminder Alert Banner */}
      <div className="bg-susu border-l-4 border-cabai p-3 rounded-r-md">
        <p className="text-sm font-bold text-tua">
          ⚠️ Pesanan belum terkirim otomatis!
        </p>
        <p className="text-xs text-karamel mt-1 leading-relaxed">
          Pastikan Anda menekan tombol <strong>Kirim</strong> di aplikasi WhatsApp agar pesanan langsung masuk ke admin kami.
        </p>
      </div>

      {/* Order Details List */}
      <div className="bg-susu/80 p-4 rounded-md border border-tua/15 text-sm space-y-1.5 text-tua">
        <div className="flex justify-between border-b border-tua/10 pb-1.5">
          <span className="text-karamel text-xs">Nama:</span>
          <span className="font-semibold">{values.name}</span>
        </div>
        <div className="flex justify-between border-b border-tua/10 py-1.5">
          <span className="text-karamel text-xs">Varian Rasa:</span>
          <span className="font-semibold">{variantName}</span>
        </div>
        {values.size && (
          <div className="flex justify-between border-b border-tua/10 py-1.5">
            <span className="text-karamel text-xs">Ukuran:</span>
            <span className="font-semibold">{values.size}</span>
          </div>
        )}
        <div className="flex justify-between border-b border-tua/10 py-1.5">
          <span className="text-karamel text-xs">Jumlah:</span>
          <span className="font-semibold">{values.qty} bungkus</span>
        </div>
        <div className="flex justify-between border-b border-tua/10 py-1.5">
          <span className="text-karamel text-xs">No. Telepon:</span>
          <span className="font-semibold">{values.phone}</span>
        </div>
        <div className="pt-1.5">
          <span className="text-karamel text-xs block mb-0.5">Alamat Pengiriman:</span>
          <p className="text-xs text-tua/90 whitespace-pre-line bg-mentega/20 p-2 rounded-xs border border-tua/10">
            {values.address}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-tua text-susu font-bold hover:bg-karamel transition-colors shadow-xs"
        >
          <IconWhatsApp className="w-5 h-5 text-keju" />
          <span>Buka WhatsApp Lagi</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full text-center text-xs font-semibold text-karamel hover:text-tua py-2 transition-colors cursor-pointer underline"
        >
          Buat pesanan baru atau ubah data
        </button>
      </div>
    </div>
  );
}
