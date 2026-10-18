# Website Makaroni Keju Lestari Purwokerto

Website etalase resmi modern dan cepat untuk **Makaroni Keju Lestari** (Purwokerto, est. 2012) dengan integrasi pemesanan langsung ke WhatsApp admin.

---

## Fitur Utama

- **6 Halaman Utama:** Beranda, Tentang Kami, Katalog Produk, Cara Pesan & Form Order, Galeri Foto, serta Kontak & Lokasi.
- **Form Pesan Cepat:** Otomatis menghasilkan format chat WhatsApp ke nomor admin (`6281904284264`), tervalidasi di sisi klien, tanpa database/backend (aman dan bebas biaya).
- **Desain Klasik Modern:** Mengusung filosofi label kemasan toko kue tradisional (*warm yellow* & *dark chocolate brown*) dengan lencana stempel (*scalloped badge*), jendela lengkung (*arch image*), dan kartu bingkai ganda.
- **Performa & Animasi Ringan:** Dibuat dengan Vite + React, Tailwind CSS v4, dan animasi pembuka stempel hero yang halus dengan GSAP (menghormati `prefers-reduced-motion`).
- **Sentralisasi Konten:** Semua teks, harga, dan varian berada di folder `src/content/` agar pemilik toko dapat memperbarui data dengan mudah.

---

## Perintah Pengembangan

```bash
# Menjalankan server pengembangan lokal (http://localhost:5173/)
npm run dev

# Menjalankan pengujian unit (Vitest)
npm run test

# Membangun bundel produksi
npm run build

# Meninjau pratinjau hasil build produksi
npm run preview
```

---

## Panduan Pengelola (Owner)

Petunjuk lengkap mengenai cara mengubah harga, menambahkan varian baru, atau mengganti nomor WhatsApp dapat dilihat pada:
👉 **[PANDUAN_OWNER.md](./PANDUAN_OWNER.md)**
