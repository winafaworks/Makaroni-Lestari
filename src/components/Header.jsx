import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Badge from "./Badge";
import { site } from "../content/site";
import { IconMenu, IconClose, IconChevronDown } from "./icons/Icons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Deteksi scroll untuk mengecilkan header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat rute berpindah
  useEffect(() => {
    setIsOpen(false);
    setIsProductDropdownOpen(false);
    setIsMobileProductOpen(false);
  }, [location.pathname]);

  // Klik di luar dropdown desktop untuk menutupnya
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Kunci scroll body saat menu mobile aktif
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const packagingItems = [
    {
      title: "Kemasan Lainnya",
      desc: "Hampers, bouquet, 5kg dll.",
      to: "/kemasan-lainnya",
      badge: "Spesial"
    }
  ];

  const otherNavLinks = [
    { to: "/", label: "Beranda" },
    { to: "/pesan", label: "Cara Pesan" },
    { to: "/tentang", label: "Tentang Kami" },
    { to: "/galeri", label: "Galeri" },
    { to: "/kontak", label: "Kontak" }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? "bg-keju/95 backdrop-blur-md border-tua/20 shadow-xs py-2.5"
          : "bg-keju border-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Badge size="sm" className="group-hover:rotate-6 transition-transform duration-200" />
          <div className="flex flex-col">
            <span className="font-judul text-base sm:text-lg md:text-xl text-tua leading-none tracking-tight">
              Makaroni Lestari
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-karamel mt-1">
              Purwokerto
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navigasi Utama">
          {/* Beranda */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-bold transition-colors ${
                isActive
                  ? "text-tua border-b-2 border-tua pb-0.5"
                  : "text-karamel hover:text-tua"
              }`
            }
          >
            Beranda
          </NavLink>

          {/* Menu Produk dengan Dropdown Pilihan Kemasan */}
          <div
            ref={dropdownRef}
            className="relative inline-flex items-center"
            onMouseEnter={() => setIsProductDropdownOpen(true)}
            onMouseLeave={() => setIsProductDropdownOpen(false)}
          >
            <div className="inline-flex items-center gap-1">
              <NavLink
                to="/produk"
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors ${
                    isActive
                      ? "text-tua border-b-2 border-tua pb-0.5"
                      : "text-karamel hover:text-tua"
                  }`
                }
              >
                Produk
              </NavLink>
              <button
                type="button"
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                className="text-karamel hover:text-tua p-0.5 rounded cursor-pointer transition-transform duration-200 flex items-center justify-center"
                aria-expanded={isProductDropdownOpen}
                aria-label="Buka menu pilihan kemasan"
              >
                <IconChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isProductDropdownOpen ? "rotate-180 text-tua" : ""
                  }`}
                />
              </button>
            </div>

            {/* Panel Dropdown Desktop - Truly Absolute & Hover Protected */}
            {isProductDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-fade-in pointer-events-auto">
                <div className="rounded-sm bg-susu border-2 border-tua shadow-2xl p-3">
                  <div className="px-2 py-1 border-b border-tua/15 mb-2 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-karamel">
                      Pilihan Kemasan
                    </span>
                    <Link
                      to="/produk"
                      onClick={() => setIsProductDropdownOpen(false)}
                      className="text-[10px] font-bold text-tua hover:underline"
                    >
                      Semua Varian →
                    </Link>
                  </div>
                  <div className="space-y-1">
                    {packagingItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.to}
                        onClick={() => setIsProductDropdownOpen(false)}
                        className="group flex items-start justify-between p-2 rounded-xs hover:bg-mentega/40 transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="text-xs font-bold text-tua group-hover:text-karamel block leading-tight">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-karamel/80 block mt-0.5 leading-snug">
                            {item.desc}
                          </span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-tua text-mentega shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigasi Lainnya */}
          {otherNavLinks.slice(1).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${
                  isActive
                    ? "text-tua border-b-2 border-tua pb-0.5"
                    : "text-karamel hover:text-tua"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Order Button */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/pesan"
            className="btn-press px-5 py-2.5 rounded-full bg-tua text-susu font-bold text-sm hover:bg-karamel transition-colors shadow-xs"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* Animated Mobile Hamburger Button (Morph Hamburger to X) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-full bg-tua text-susu hover:bg-karamel transition-all duration-200 cursor-pointer shadow-xs active:scale-90"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        >
          <span
            className={`block w-5 h-0.5 bg-susu rounded-full transition-all duration-300 ease-in-out origin-center ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-susu rounded-full transition-all duration-200 ease-in-out ${
              isOpen ? "opacity-0 -translate-x-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-susu rounded-full transition-all duration-300 ease-in-out origin-center ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu dengan Animasi Slide Down & Staggered Items */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[60px] z-50 bg-tua text-susu flex flex-col p-6 animate-menu-slide-down overflow-y-auto shadow-2xl"
          style={{
            height: "calc(100vh - 60px)",
            paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))"
          }}
        >
          <nav className="flex flex-col space-y-3 pt-2" aria-label="Menu Ponsel">
            {/* Beranda */}
            <div className="animate-menu-item-in" style={{ animationDelay: "40ms" }}>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-xl font-judul py-2 border-b border-susu/10 transition-colors block ${
                    isActive ? "text-mentega pl-2" : "text-susu hover:text-mentega"
                  }`
                }
              >
                Beranda
              </NavLink>
            </div>

            {/* Produk dengan Accordion Pilihan Kemasan di Ponsel */}
            <div
              className="border-b border-susu/10 pb-2 animate-menu-item-in"
              style={{ animationDelay: "90ms" }}
            >
              <div className="flex items-center justify-between py-2">
                <NavLink
                  to="/produk"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-xl font-judul transition-colors ${
                      isActive ? "text-mentega pl-2" : "text-susu hover:text-mentega"
                    }`
                  }
                >
                  Produk
                </NavLink>
                <button
                  type="button"
                  onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                  className="p-2 text-susu hover:text-mentega cursor-pointer flex items-center gap-1 text-xs transition-colors"
                  aria-expanded={isMobileProductOpen}
                  aria-label="Pilihan kemasan"
                >
                  <span className="text-xs text-susu/70">Pilihan Kemasan</span>
                  <IconChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${
                      isMobileProductOpen ? "rotate-180 text-mentega" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Sub-menu Kemasan di Ponsel */}
              {isMobileProductOpen && (
                <div className="pl-3 py-2 space-y-2 bg-susu/10 rounded-md mt-1 border-l-2 border-mentega animate-menu-slide-down">
                  {packagingItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileProductOpen(false);
                      }}
                      className="block text-sm text-susu/90 hover:text-mentega py-1"
                    >
                      <div className="flex items-center justify-between pr-2">
                        <span className="font-semibold">{item.title}</span>
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-keju text-tua">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-susu/60 block mt-0.5">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Lainnya dengan animasi berjenjang (staggered delay) */}
            {otherNavLinks.slice(1).map((item, idx) => (
              <div
                key={item.to}
                className="animate-menu-item-in"
                style={{ animationDelay: `${140 + idx * 50}ms` }}
              >
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-xl font-judul py-2 border-b border-susu/10 transition-colors block ${
                      isActive ? "text-mentega pl-2" : "text-susu hover:text-mentega"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </div>
            ))}
          </nav>

          <div
            className="mt-auto pt-6 border-t border-susu/20 animate-menu-item-in"
            style={{ animationDelay: "390ms" }}
          >
            <Link
              to="/pesan"
              onClick={() => setIsOpen(false)}
              className="btn-press w-full py-3.5 rounded-full bg-keju text-tua font-bold text-base flex items-center justify-center shadow-md hover:bg-mentega transition-colors"
            >
              Pesan Makaroni
            </Link>
            <p className="text-center text-xs text-susu/60 mt-4">
              {site.name} • Est. {site.yearEstablished}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
