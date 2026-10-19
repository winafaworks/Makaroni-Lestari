import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconClose, IconWhatsApp } from "./icons/Icons";

const VISITED_KEY = "lestari_visited_pesan";
const LEFT_TIME_KEY = "lestari_left_pesan_at";
const SHOWN_KEY = "lestari_order_reminder_shown";
const REMINDER_DELAY_MS = 60 * 1000; // 1 menit

/**
 * Komponen Pengingat Pemesanan (Toast Notification) di pojok kanan atas.
 * Muncul setelah pengguna meninggalkan halaman cara pesan/form pemesanan lebih dari 1 menit.
 * Hanya muncul 1 kali saja per sesi.
 */
export default function OrderReminderToast() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isPesanPage = location.pathname === "/pesan";

    if (isPesanPage) {
      try {
        // Tandai bahwa pengguna pernah mengunjungi halaman pesan
        sessionStorage.setItem(VISITED_KEY, "true");
        // Hapus catatan waktu meninggalkan karena pengguna sedang aktif di halaman pesan
        sessionStorage.removeItem(LEFT_TIME_KEY);
      } catch {
        // Abaikan jika sessionStorage dibatasi
      }
      setIsVisible(false);
      return;
    }

    // Jika pengguna berada di luar halaman /pesan
    try {
      const alreadyShown = sessionStorage.getItem(SHOWN_KEY) === "true";
      if (alreadyShown) {
        return;
      }

      const hasVisited = sessionStorage.getItem(VISITED_KEY) === "true";
      if (hasVisited) {
        let leftAt = sessionStorage.getItem(LEFT_TIME_KEY);
        if (!leftAt) {
          leftAt = Date.now().toString();
          sessionStorage.setItem(LEFT_TIME_KEY, leftAt);
        }
      }
    } catch {
      // Abaikan jika sessionStorage dibatasi
    }
  }, [location.pathname]);

  // Pantau waktu setiap detik apakah sudah melebihi 1 menit sejak meninggalkan /pesan
  useEffect(() => {
    const interval = setInterval(() => {
      if (location.pathname === "/pesan") return;

      try {
        const alreadyShown = sessionStorage.getItem(SHOWN_KEY) === "true";
        if (alreadyShown) {
          clearInterval(interval);
          return;
        }

        const leftAt = Number(sessionStorage.getItem(LEFT_TIME_KEY));
        if (leftAt && Date.now() - leftAt >= REMINDER_DELAY_MS) {
          setIsVisible(true);
          sessionStorage.setItem(SHOWN_KEY, "true");
          sessionStorage.removeItem(LEFT_TIME_KEY);
          clearInterval(interval);
        }
      } catch {
        // Abaikan jika sessionStorage dibatasi
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(SHOWN_KEY, "true");
      sessionStorage.removeItem(LEFT_TIME_KEY);
    } catch {
      // Abaikan
    }
  };

  if (!isVisible || location.pathname === "/pesan") {
    return null;
  }

  return (
    <aside
      aria-label="Pengingat Pemesanan"
      className="fixed top-20 right-4 sm:right-6 z-[60] w-[calc(100%-2rem)] sm:w-[350px] bg-susu border-2 border-tua rounded-xl shadow-2xl p-4 animate-toast-in select-none"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-keju opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-tua"></span>
          </span>
          <h3 className="font-judul text-sm sm:text-base text-tua font-bold leading-tight">
            Lanjutkan Pemesanan?
          </h3>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Tutup pemberitahuan"
          className="text-tua/60 hover:text-tua p-1 -mr-1 -mt-1 rounded-md hover:bg-mentega/40 transition-colors cursor-pointer"
        >
          <IconClose className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-karamel mt-2 mb-3.5 leading-relaxed font-medium">
        Anda meninggalkan form pemesanan. Ingin melanjutkan pesanan Makaroni Keju Lestari Anda sekarang?
      </p>

      <div className="flex items-center gap-2">
        <Link
          to="/pesan"
          onClick={handleDismiss}
          className="btn-press flex-1 inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-full bg-tua text-susu hover:bg-karamel text-xs font-bold transition-colors shadow-xs"
        >
          <IconWhatsApp className="w-3.5 h-3.5 text-keju" />
          <span>Lanjutkan Pesan</span>
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          className="py-2 px-3 rounded-full border border-tua/25 hover:bg-mentega/40 text-tua text-xs font-semibold transition-colors cursor-pointer"
        >
          Nanti Saja
        </button>
      </div>
    </aside>
  );
}
