import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconWhatsApp } from "./icons/Icons";

/**
 * Tombol Pesan Melayang (Order FAB)
 * Hanya muncul ketika halaman di-scroll (baik di desktop maupun mobile)
 * dan disembunyikan pada halaman /pesan.
 */
export default function OrderFab() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muncul setelah di-scroll lebih dari 150px
      setIsVisible(window.scrollY > 150);
    };

    // Cek posisi awal saat rute berpindah
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Sembunyikan di halaman /pesan
  if (location.pathname === "/pesan") {
    return null;
  }

  return (
    <aside aria-label="Aksi Cepat">
      <Link
        to="/pesan"
        className={`btn-press fixed bottom-6 right-6 z-40 h-[52px] px-5 rounded-full bg-tua text-keju border-2 border-susu shadow-lg flex items-center gap-2.5 hover:bg-karamel ring-2 ring-tua/20 font-bold text-sm select-none transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-4 pointer-events-none scale-95"
        }`}
        style={{
          bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))"
        }}
        tabIndex={isVisible ? 0 : -1}
      >
        <IconWhatsApp className="w-5 h-5 text-keju" />
        <span className="tracking-wide">Pesan</span>
      </Link>
    </aside>
  );
}
