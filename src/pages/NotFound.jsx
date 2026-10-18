import React from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";

export default function NotFound() {
  return (
    <div className="bg-keju doodle-pattern min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="bg-susu frame-kemasan rounded-sm p-8 sm:p-12 text-center max-w-md w-full shadow-md">
        <Badge size="lg" className="mx-auto mb-6" />
        <h1 className="font-judul text-4xl sm:text-5xl text-tua mb-2">404</h1>
        <h2 className="font-judul text-xl text-karamel mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-tua/80 mb-6 leading-relaxed">
          Halaman yang Anda tuju mungkin sudah dipindahkan atau alamat yang dimasukkan salah.
        </p>
        <Link
          to="/"
          className="btn-press inline-block px-6 py-3 rounded-full bg-tua text-susu font-bold text-sm hover:bg-karamel transition-colors shadow-xs"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
