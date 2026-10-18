# AGENT.md: Panduan Kerja untuk AI Agent

Proyek: website Makaroni Keju Lestari (Purwokerto). Baca file ini lebih dulu, lalu `prd.md` (apa yang dibangun) dan `design.md` (tampilan dan gerak). Bila ada konflik, urutan acuan: `prd.md` untuk fungsi, `design.md` untuk tampilan, file ini untuk cara kerja.

---

## 0. Aturan perubahan (wajib dipatuhi)

Berlaku untuk setiap perintah perubahan dari pemilik proyek, baik pada kode maupun dokumen (`prd.md`, `design.md`, `agent.md`):

1. Ubah **hanya** yang diminta. Halaman, fitur, komponen, gaya, teks, dan dokumen lain dibiarkan persis seperti sebelumnya.
2. Jangan merapikan, mengganti nama, memformat ulang, merefaktor, atau memperbarui dependensi di luar yang diminta, sekalipun tampak lebih baik.
3. Jika perubahan yang diminta tidak mungkin tanpa menyentuh bagian lain (misalnya komponen yang dipakai banyak halaman), **berhenti dan tanyakan** dulu sambil menyebut bagian yang akan terdampak.
4. Jika menemukan masalah lain, laporkan di akhir sebagai saran. Jangan diperbaiki sendiri.
5. Buat perubahan sekecil mungkin. Sebelum selesai, periksa daftar berkas yang berubah dan pastikan semuanya terkait perintah.
6. Tutup dengan ringkasan: apa yang diubah, berkas yang tersentuh, dan konfirmasi bahwa bagian lain tidak diubah.
7. Jika perintah ambigu, ajukan satu pertanyaan singkat. Jangan menebak.

Pembangunan awal dari nol tidak dibatasi aturan ini. Aturan berlaku setelah ada bagian yang sudah jadi.

---

## 1. Tugas

Bangun website statis 6 halaman untuk usaha makaroni keju, dengan pemesanan lewat WhatsApp. Tampilan klasik sederhana berwarna kuning dan cokelat, terasa modern. Tanpa backend, tanpa biaya hosting.

## 2. Stack (tetap, jangan ganti tanpa alasan tertulis)

- React 18+ dan Vite, JavaScript (JSX)
- Tailwind CSS v4, token warna dan font dari `design.md` dideklarasikan di `src/styles/index.css` dengan `@theme`
- React Router (`BrowserRouter`)
- GSAP dengan `@gsap/react` (`useGSAP`). Tidak ada pustaka animasi lain
- Font: `@fontsource/young-serif` dan `@fontsource-variable/figtree`
- Ikon media sosial: komponen SVG inline sendiri (jangan bergantung pada paket ikon merek)
- Hosting target: Cloudflare Pages atau Netlify (SPA fallback ke `index.html`)

Perintah:
```bash
npm install
npm run dev       # pengembangan
npm run build     # produksi, harus lolos tanpa peringatan
npm run preview   # cek hasil build
npm run lint
```

## 3. Struktur proyek

```
lestari-web/
├─ public/
│  ├─ favicon.svg, og-image.jpg, robots.txt, sitemap.xml
│  └─ images/            # WebP: hero, produk, galeri
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx            # routes, layout, tombol WhatsApp melayang
│  ├─ content/           # SATU-SATUNYA tempat teks, harga, tautan
│  │  ├─ site.js         # nama, nomor WA, alamat, jam, tautan sosial, SEO, template pesan, batas jumlah
│  │  ├─ products.js     # varian, ukuran, harga, foto
│  │  ├─ gallery.js
│  │  └─ steps.js        # langkah cara pemesanan
│  ├─ lib/whatsapp.js    # susun pesan dan tautan wa.me, normalisasi telepon
│  ├─ lib/validate.js    # aturan validasi form
│  ├─ components/        # Header, Footer, Badge, ProductCard, SizeChips, OrderForm, VariantPicker, QtyStepper, OrderSummary, OrderFab, Lightbox, icons/
│  ├─ pages/             # Home, About, Products, Order (form + cara pesan), Contact, Gallery, NotFound
│  ├─ animations/        # heroIntro.js
│  └─ styles/index.css
├─ PANDUAN_OWNER.md      # cara mengubah teks dan harga (dibuat di akhir)
└─ README.md
```

## 4. Aturan konten (penting)

1. **Semua teks, harga, varian, nomor, dan tautan hanya boleh berasal dari `src/content/`.** Komponen tidak boleh menulis data itu langsung.
2. **Jangan mengarang data.** Harga, alamat, nomor WhatsApp, tautan TikTok/YouTube/Shopee, klaim halal/BPOM/bahan, dan masa simpan belum tersedia. Isi dengan penanda yang mudah dicari:
   ```js
   phone: "TODO(OWNER)",           // format 62812xxxxxxx
   ```
   Tampilan harus tetap rapi saat data masih `TODO(OWNER)` (tampilkan "Hubungi kami untuk harga", jangan menampilkan teks `TODO`). Daftar semua `TODO(OWNER)` harus bisa dicari dengan `grep -rn "TODO(OWNER)" src`.
3. Data yang sudah pasti: nama "Makaroni Keju Lestari", berdiri 2012, Purwokerto, Instagram `https://www.instagram.com/makaronikejulestari/`, varian Original Keju (kemasan 90 g, best seller) dan Pedas.
4. Bahasa Indonesia, nada sesuai bagian 8 di `design.md`.
5. Jangan menyalin teks promosi panjang dari website lama tanpa mengeceknya. Beberapa klaim di sana ("sehat", "aman dikonsumsi kapan saja") perlu konfirmasi owner sebelum dipakai.

## 5. Form pemesanan (statis, tanpa backend)

Pembeli mengisi form, lalu tombol membuka WhatsApp owner dengan pesan yang sudah terisi. **Tidak ada server, Google Form, atau layanan pihak ketiga.** Data hanya lewat tautan `wa.me`.

### Isian (lihat `prd.md` bagian 5.4)
Nama pemesan, Varian rasa, Jumlah produk, Nomor telepon, Detail alamat. Isian Ukuran kemasan hanya muncul bila varian terpilih punya lebih dari satu ukuran di `products.js`.

### Aturan validasi (`src/lib/validate.js`)

| Isian | Aturan | Pesan galat |
|---|---|---|
| Nama | dipangkas spasi, 2–60 karakter | Isi nama pemesan minimal 2 huruf. |
| Varian | harus salah satu id di `products.js` | Pilih varian rasa. |
| Ukuran | wajib bila varian punya >1 ukuran | Pilih ukuran kemasan. |
| Jumlah | bilangan bulat 1 sampai `site.maxQty` (default 99) | Jumlah harus antara 1 dan 99. |
| Telepon | spasi, titik, dan tanda hubung dibuang, lalu cocok dengan pola `PHONE_RE` di bawah tabel | Nomor telepon belum benar. Contoh: 0812 3456 7890. |
| Alamat | dipangkas, 10–300 karakter | Tulis alamat selengkapnya: jalan, nomor, kelurahan, kecamatan, dan kota. |

Pola telepon (nomor seluler Indonesia, 10–13 digit):
```js
export const PHONE_RE = /^(?:\+?62|0)8[1-9]\d{6,11}$/;
```

### `src/lib/whatsapp.js`

```js
import { site } from "../content/site";

const clean = (s) => String(s).replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

export function buildOrderMessage({ name, variant, size, qty, phone, address }) {
  return [
    site.orderTemplate.opening,            // "Halo Lestari, saya mau pesan Makaroni Keju."
    "",
    `Nama: ${clean(name)}`,
    `Varian rasa: ${variant}`,
    size ? `Ukuran: ${size}` : null,
    `Jumlah: ${qty}`,
    `No. telepon: ${clean(phone)}`,
    `Alamat: ${clean(address)}`,
    "",
    site.orderTemplate.closing,            // "Terima kasih."
  ].filter((line) => line !== null).join("\n");
}

export function buildOrderLink(order) {
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(buildOrderMessage(order))}`;
}

// Tanya cepat tanpa form (halaman Kontak)
export const directChatLink = () => `https://wa.me/${site.phone}`;
```

`site.phone` memakai format internasional tanpa `+` atau spasi (contoh `6281234567890`). Nomor pembeli tidak dinormalisasi di isi pesan (tampil seperti yang diketik); validasi saja yang menerima `08...`, `62...`, dan `+62...`.

### Perilaku `OrderForm`
1. `<form noValidate>` dengan validasi buatan sendiri. Validasi saat `blur` dan saat kirim.
2. Saat kirim dengan isian salah: tampilkan galat di bawah masing-masing isian (`aria-invalid`, `aria-describedby`), pindahkan fokus ke isian pertama yang salah. WhatsApp **tidak** dibuka.
3. Saat valid, di dalam handler yang sama (tanpa `await`, agar tidak diblokir pemblokir popup):
   ```js
   const url = buildOrderLink(values);
   window.open(url, "_blank", "noopener,noreferrer");
   setSent({ url, values });   // tampilkan OrderSummary
   ```
4. `OrderSummary` memuat ringkasan, kalimat "Pesanan belum terkirim. Tekan Kirim di WhatsApp agar pesanan sampai ke kami.", dan tautan cadangan "Buka WhatsApp lagi" (`<a href={url}>`).
5. Baca `?varian=<id>` dari URL untuk varian awal; abaikan bila id tidak dikenal.
6. Tombol "Pesan varian ini" di `ProductCard` hanyalah ``<Link to={`/pesan?varian=${id}`}>``; ia **tidak** membuat pesan WhatsApp sendiri.
7. `OrderFab` (tombol Pesan melayang) tampil di semua halaman kecuali `/pesan`, menuju `/pesan`.
8. Jangan menyimpan isi form di `localStorage`, cookie, atau mengirimnya ke mana pun. Tampilkan kalimat privasi di dekat tombol.
9. Aksesibilitas: label terhubung ke isian (`htmlFor`), `inputMode="tel"` dan `autoComplete="tel"` untuk telepon, `autoComplete="name"` untuk nama, `autoComplete="street-address"` untuk alamat, `inputMode="numeric"` untuk jumlah.
10. Jika `site.phone` masih `TODO(OWNER)`: tombol dinonaktifkan dengan keterangan "Nomor WhatsApp belum diisi", dan `npm run build` mencetak peringatan (bukan galat).

### Pengujian
Tambahkan Vitest (dev dependency saja) untuk `lib/validate.js` dan `lib/whatsapp.js`. Kasus minimal: telepon `0812 3456 7890`, `+62 812-3456-7890`, `6281234567890` valid; `12345`, `0712345678`, huruf, dan kosong tidak valid; jumlah 0, 100, `2.5`, dan kosong tidak valid; pesan berisi baris baru dan karakter `&`, `#`, `%`, emoji dikodekan benar oleh `encodeURIComponent`; alamat dengan beberapa baris tetap utuh.

## 6. Animasi (GSAP)

Ikuti bagian 6 `design.md` secara ketat:

- **Hanya satu adegan otomatis:** stempel lencana di hero. Jangan menambahkan animasi masuk di setiap bagian, hover di setiap kartu, atau efek paralaks.
- Gerak lain hanya sebagai respons aksi pengguna (tombol, chip, menu, lightbox) dan satu `ScrollTrigger` untuk header.
- Bungkus semua dalam `useGSAP` dan `gsap.matchMedia()`; pada `prefers-reduced-motion: reduce` tampilkan keadaan akhir tanpa animasi.
- Animasikan hanya `transform` dan `opacity`. Jangan menganimasikan `width`, `height`, `top`, atau `left`.
- Konten harus terbaca tanpa JavaScript (jangan menyembunyikan elemen lewat CSS dan baru memunculkannya hanya lewat GSAP tanpa cadangan).

## 7. Gaya kode

- Komponen fungsional, satu komponen per file, nama berkas PascalCase.
- Gaya memakai kelas Tailwind dan token (`bg-keju`, `text-tua`, `font-judul`). **Jangan menulis hex langsung di komponen.**
- Gambar selalu punya `alt` yang bermakna, `width`, dan `height` (hindari lonjakan tata letak).
- HTML semantik: `header`, `nav`, `main`, `section`, `footer`; satu `h1` per halaman; tombol untuk aksi, tautan untuk navigasi.
- Tanpa `localStorage` untuk data penting. Tidak ada pelacak pihak ketiga.
- Komentar singkat dalam Bahasa Indonesia di folder `content/` agar owner paham cara mengubahnya.
- Mobile-first: kelas dasar Tailwind untuk ponsel, lalu tambahkan `sm:`, `md:`, `lg:`, `xl:` untuk layar lebih besar. Jangan memberi lebar piksel tetap pada wadah.
- Meta viewport: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Jangan memakai `user-scalable=no` atau `maximum-scale` agar pengguna tetap bisa memperbesar.
- Tinggi layar memakai `svh`/`dvh` dengan cadangan `vh`. Tata letak tidak boleh bergantung pada tinggi layar.
- Efek hover hanya di dalam `@media (hover: hover)`. Semua fungsi harus bisa dipakai dengan sentuhan dan keyboard.
- Isian form (`input`, `select`, `textarea`) berukuran font minimal 16 px agar iOS tidak memperbesar layar sendiri.
- Hormati safe area (`env(safe-area-inset-*)`) untuk header, tombol melayang, dan footer.

## 8. Urutan pengerjaan

Kerjakan berurutan. Setelah tiap tahap, jalankan `npm run build` dan perbaiki sampai bersih.

1. **Kerangka:** Vite, Tailwind dengan token, font, routing 6 halaman, header, footer, layout.
2. **Konten:** isi `src/content/` (data pasti, sisanya `TODO(OWNER)`).
3. **Komponen inti:** `ProductCard`, `SizeChips`, `Badge` (lencana bergerigi), ikon sosial, `OrderFab` (tombol Pesan melayang).
4. **Halaman:** Beranda, Produk, Cara Pemesanan, Kontak, Tentang, Galeri.
5. **Form pemesanan:** `validate.js`, `whatsapp.js`, `OrderForm` dan komponen pendukung, tombol "Pesan varian ini" ke `/pesan`, tombol Pesan melayang, uji Vitest.
6. **Gerak:** adegan hero, menu ponsel, lightbox, header. Uji dengan reduced motion.
7. **SEO dan metadata:** judul dan deskripsi per halaman, Open Graph, `robots.txt`, `sitemap.xml`, data terstruktur bisnis lokal.
8. **Optimasi:** gambar WebP dan `srcset`, lazy loading, cek ukuran bundel.
9. **Dokumentasi:** `README.md` dan `PANDUAN_OWNER.md`.

Jika data atau aset penting belum ada (logo transparan, foto, nomor), **berhenti dan tanyakan**, atau gunakan penampung yang jelas ditandai. Jangan diam-diam mengganti dengan data karangan.

## 9. Definisi selesai (Definition of Done)

Sebuah halaman atau fitur dianggap selesai bila:

- [ ] Tampil benar di lebar 320, 360, 390, 768, 1024, 1280, dan 1920 px, portrait dan landscape, tanpa gulir horizontal
- [ ] Tidak ada elemen terpotong atau tumpang tindih; target sentuh ≥ 44 px; semua fungsi bisa dipakai tanpa hover
- [ ] Isian form tidak tertutup keyboard atau header lengket saat difokus
- [ ] Diuji di Chrome Android, Safari iOS (perangkat nyata bila ada), Chrome/Edge/Firefox desktop, dan emulasi tablet
- [ ] Tautan WhatsApp diuji: di ponsel membuka aplikasi, di komputer membuka WhatsApp Web atau Desktop
- [ ] Sesuai token warna, font, dan bentuk di `design.md`
- [ ] Form menolak isian yang salah dengan pesan galat jelas, dan hanya membuka WhatsApp bila semua valid
- [ ] Pesan WhatsApp berisi nama, varian, jumlah, telepon, dan alamat persis seperti yang diisi, terkirim ke nomor owner yang benar (uji di ponsel dan komputer)
- [ ] 100% varian bisa dipilih di form dan punya tombol "Pesan varian ini" yang memilihkan varian dengan benar
- [ ] Semua ikon dan tautan membuka tujuan yang benar
- [ ] Bisa dioperasikan dengan keyboard; fokus terlihat; kontras ≥ 4,5:1
- [ ] `prefers-reduced-motion` diuji
- [ ] `npm run build` dan `npm run lint` bersih
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Tidak ada teks `TODO(OWNER)` yang tampil ke pengunjung

## 10. Yang tidak boleh dilakukan

- Menambah keranjang, pembayaran, login, atau backend.
- Mengirim data pembeli ke server, Google Form, email, atau layanan pihak ketiga mana pun. Data hanya lewat tautan WhatsApp.
- Menyimpan isi form di `localStorage`, cookie, atau tempat lain.
- Memakai pustaka UI besar (MUI, Bootstrap, dan sejenisnya) atau pustaka animasi tambahan.
- Mengubah arah visual ke gaya lain (misalnya krem dengan oranye terakota, atau latar hitam pekat) tanpa persetujuan.
- Menambah efek "muncul sambil naik" di setiap bagian.
- Menambah klaim produk, testimoni, atau angka penjualan yang tidak diberikan owner.
- Mengganti nomor, harga, atau tautan tanpa konfirmasi owner.
- Mengaktifkan penggantian tautan di kanal lama; itu keputusan owner setelah peluncuran (WBS 4.5).

## 11. Serah terima

`PANDUAN_OWNER.md` harus berisi, dengan langkah bergambar atau kalimat pendek tanpa istilah teknis:
1. Cara membuka `src/content/` dan mengubah satu teks atau harga.
2. Cara menyimpan perubahan dan memastikan website ter-update.
3. Cara menambah varian baru (salin satu blok di `products.js`).
4. Cara mengganti foto.
5. Siapa yang dihubungi bila ada masalah.

Kriteria penerimaan serah terima: owner dapat masuk ke akun dan mengubah satu teks tanpa bantuan.
