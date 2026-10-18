# Design: Makaroni Keju Lestari

Arah visual: **klasik sederhana, terasa modern.** Seperti label kemasan toko kue lama yang dirapikan dengan tata letak dan gerak masa kini.

Logo yang ada: lencana cokelat tua berbingkai putih bergerigi (scalloped), tiga irisan keju kuning, tulisan "Lestari" berskrip krem, "Est. 2012". Kemasan: kuning cerah berpola keju dan makaroni. Desain website mengambil bahasa visual itu langsung, bukan gaya generik.

---

## 1. Prinsip

1. **Kuning mendominasi, cokelat menjadi tinta.** Latar utama kuning keju, teks dan blok kontras berwarna cokelat tua. Bukan krem dengan aksen oranye.
2. **Satu hal yang diingat: lencana "stempel".** Logo bergerigi muncul seperti cap yang ditekan di hero. Sisanya tenang.
3. **Tiga bentuk khas, dipakai berulang:** tepi bergerigi (dari logo), jendela lengkung (arch) untuk foto, dan lubang keju (lingkaran) sebagai pola samar.
4. **Sederhana.** Satu kolom di ponsel, ruang napas lega, tidak ada dekorasi yang tidak punya tugas.
5. **Tombol pesan selalu terlihat dan jelas.** Itu tujuan situs ini.

## 2. Warna (token)

| Nama | Hex | Peran |
|---|---|---|
| Kuning Keju | `#F5B722` | Latar utama, warna merek |
| Kuning Mentega | `#FFD45C` | Latar bagian kedua, hover, sorotan |
| Kuning Susu | `#FFF0B8` | Permukaan kartu dan kolom isian di atas kuning |
| Cokelat Tua | `#3A1E0D` | Teks utama, blok gelap, footer (warna dasar logo) |
| Cokelat Karamel | `#7A4420` | Teks sekunder, garis, ikon |
| Merah Cabai | `#C8321E` | Khusus varian Pedas (lencana, aksen kecil) |

Kontras (rasio perkiraan):
- Cokelat Tua di atas Kuning Keju atau Mentega: sekitar 8:1 (lulus untuk semua teks).
- Kuning Keju atau Susu di atas Cokelat Tua: sekitar 8:1 (lulus).
- Cokelat Karamel di atas Kuning Susu: sekitar 5:1 (lulus untuk teks sekunder). Di atas Kuning Keju, pakai hanya untuk teks besar atau garis.
- Merah Cabai **jangan dipakai sebagai teks di atas kuning** (sekitar 3:1). Pakai sebagai latar lencana dengan teks Kuning Susu, atau sebagai aksen grafis.

Ritme bagian halaman: kuning keju, cokelat tua, kuning mentega, cokelat tua (footer). Jangan lebih dari dua bagian berturut-turut dengan warna sama.

```css
@theme {
  --color-keju: #F5B722;
  --color-mentega: #FFD45C;
  --color-susu: #FFF0B8;
  --color-tua: #3A1E0D;
  --color-karamel: #7A4420;
  --color-cabai: #C8321E;
}
```

## 3. Tipografi

| Peran | Font | Catatan |
|---|---|---|
| Judul | **Young Serif** (Google Fonts) | Serif tebal yang hangat, terasa klasik |
| Isi dan antarmuka | **Figtree** (Google Fonts) | Sans-serif bersih, mudah dibaca di layar kecil |

Pasangan ini jelas berbeda karakter: judul berkesan cetakan lama, isi terasa modern. Gunakan self-host (`@fontsource`) agar cepat dan tidak bergantung pada pihak lain. Berikan cadangan font sistem (`Georgia, serif` dan `system-ui, sans-serif`).

Skala (fluid, ukuran ponsel ke komputer):

| Tingkat | Ukuran | Line-height | Pemakaian |
|---|---|---|---|
| Display | `clamp(2.75rem, 8vw, 6rem)` | 1,02 | Judul hero |
| H1 | `clamp(2.25rem, 5vw, 3.75rem)` | 1,08 | Judul halaman |
| H2 | `clamp(1.75rem, 3.5vw, 2.5rem)` | 1,15 | Judul bagian |
| H3 | `1.375rem` | 1,25 | Nama varian |
| Isi | `1.0625rem` (17 px) | 1,65 | Paragraf |
| Kecil | `0.9375rem` | 1,5 | Keterangan, harga per ukuran |

Aturan:
- Panjang baris isi maksimum `62ch`.
- Judul rata kiri, tidak huruf kapital semua. Gunakan sentence case.
- Hindari menandai satu kata saja di judul dengan warna atau miring.
- Jangan menambah label kecil di atas setiap judul.
- Harga memakai angka tabular (`font-variant-numeric: tabular-nums`).

## 4. Bentuk dan komponen

**Tepi bergerigi (scallop).** Diambil dari bingkai logo. Dipakai pada lencana hero, label "Best seller", dan pemisah antarbagian. Dibuat dengan CSS `mask` berulang atau SVG, bukan gambar.

**Jendela lengkung (arch).** Foto produk dipotong dengan `border-radius: 999px 999px 0 0` pada bagian atas, seperti jendela toko roti klasik.

**Lubang keju.** Lingkaran tidak beraturan dengan warna Cokelat Tua opasitas 6–10% sebagai pola latar di bagian kuning. Statis, tidak bergerak.

**Kartu varian.** Bingkai ganda ala label kemasan: garis luar 2 px Cokelat Tua, garis dalam 1 px dengan jarak 6 px. Latar Kuning Susu. Foto berbentuk arch di bagian atas. Kartu varian Pedas memakai lencana Merah Cabai.

**Tombol utama "Pesan lewat WhatsApp".** Bentuk pil, latar Cokelat Tua, teks Kuning Susu, tinggi minimal 48 px. Saat ditekan turun 2 px dengan bayangan menyusut. Di atas latar gelap, balik warnanya (latar Kuning Keju, teks Cokelat Tua).

**Tombol sekunder.** Pil dengan garis 2 px Cokelat Tua, tanpa isi.

**Pilihan ukuran.** Deretan "chip" (pil kecil) yang berfungsi sebagai radio button. Terpilih: isi Cokelat Tua, teks Kuning Susu. Harga di kartu berubah sesuai ukuran terpilih.

**Tombol Pesan melayang.** Pojok kanan bawah, pil setinggi 52 px berisi ikon dan kata “Pesan”, latar Cokelat Tua, teks Kuning Keju, cincin Kuning Susu. Menuju halaman form pesanan dan disembunyikan di halaman form itu sendiri. Beri jarak aman dari tepi layar (`env(safe-area-inset-bottom)`).

**Sudut membulat.** Tidak seragam: pil untuk tombol dan chip, arch untuk foto, sudut 4 px untuk kartu. Tiap bentuk punya arti, jangan disamakan.

**Bayangan.** Hampir tidak ada. Kedalaman dibuat lewat garis dan lapisan warna.

**Form pemesanan.** Komponen terpenting di situs ini, jadi dibuat paling tenang dan paling jelas.

- Dibungkus kartu Kuning Susu dengan bingkai ganda yang sama seperti kartu varian, agar terasa satu keluarga.
- Satu kolom di semua lebar layar, lebar maksimum 560 px. Label di atas isian (bukan di dalam sebagai placeholder), huruf biasa, bukan kapital.
- Isian: tinggi 48 px, garis 2 px Cokelat Tua, sudut 4 px, latar Kuning Susu. Fokus: cincin 3 px Cokelat Tua dengan jarak 2 px.
- **Varian rasa** berupa kartu radio dengan foto kecil berbentuk arch dan nama varian. Terpilih: bingkai 3 px dan latar Kuning Mentega, ditambah tanda centang (jangan hanya warna). Bila varian lebih dari 4, ganti dengan daftar pilihan biasa.
- **Jumlah** berupa tombol − dan + (48 × 48 px) mengapit angka; angka juga bisa diketik. Tombol − nonaktif pada nilai 1.
- **Ukuran kemasan** (bila ada) memakai chip yang sama dengan halaman Produk.
- **Galat:** garis isian berubah menjadi Merah Cabai 2 px, ikon seru kecil, dan kalimat galat berwarna Cokelat Tua di bawah isian (jangan teks merah, kontrasnya kurang). Muncul tanpa animasi gerak.
- Tombol "Pesan lewat WhatsApp" selebar kartu di ponsel, di bawah satu kalimat kecil: "Data hanya dikirim lewat WhatsApp dan tidak disimpan di website."
- **Setelah ditekan:** tombol berubah menjadi "Membuka WhatsApp…", lalu panel konfirmasi menggantikan area tombol: ringkasan pesanan, pengingat "Tekan Kirim di WhatsApp agar pesanan sampai ke kami", dan tautan "Buka WhatsApp lagi". Panel muncul dengan fade 200 ms.

```
┌──────────── kartu form (garis ganda) ────────────┐
│ Pesan makaroni                                   │
│                                                  │
│ Nama pemesan                                     │
│ [______________________________]                 │
│                                                  │
│ Varian rasa                                      │
│ ( ● ╭foto╮ Original Keju )  (   ╭foto╮ Pedas )  │
│                                                  │
│ Jumlah                                           │
│ [ − ]  3  [ + ]                                  │
│                                                  │
│ Nomor telepon                                    │
│ [______________________________]                 │
│                                                  │
│ Detail alamat                                    │
│ [______________________________]                 │
│ [______________________________]                 │
│                                                  │
│ [      Pesan lewat WhatsApp      ]               │
│ Data hanya dikirim lewat WhatsApp.               │
└──────────────────────────────────────────────────┘
```

## 5. Tata letak

Lebar konten maksimum 1120 px, rata kiri. Kolom satu di ponsel, dua kolom di tablet ke atas. Jarak vertikal antarbagian `clamp(4rem, 9vw, 8rem)`. Foto bisa keluar dari kolom satu sisi agar ritme tidak monoton.

### Header
```
[ lencana logo ]  Lestari            Produk  Cara Pesan  Tentang  Galeri  Kontak   [ Pesan ]
```
Di ponsel: logo di kiri, tombol menu di kanan, panel menu penuh layar berlatar Cokelat Tua. Header lengket, lebih kecil setelah digulir.

### Beranda: hero (Kuning Keju)
```
┌──────────────────────────────────────────────┐
│ header                                       │
│                                              │
│  Makaroni keju             ╭─────╮           │
│  buatan Purwokerto,        │ (L) │  lencana  │
│  sejak 2012.               │     │  stempel  │
│                            ╰─────╯           │
│  Renyah, gurih, kejunya terasa.              │
│  [ Pesan lewat WhatsApp ] [ Lihat produk ]   │
│                                              │
│  ∿∿∿∿∿∿ tepi bergerigi ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿  │
└──────────────────────────────────────────────┘
```
Ponsel: lencana di atas judul, tombol lebar penuh. Lencana adalah elemen paling berkesan di halaman.

### Beranda: bagian berikutnya
```
Varian (Kuning Mentega)   : 2–3 kartu varian bergaris ganda, tombol "Lihat semua produk"
Cara pesan (Cokelat Tua)  : 3 langkah berurutan (ini memang urutan, boleh bernomor)
Galeri (Kuning Keju)      : 4–6 foto arch, tautan "Lihat galeri"
Kontak (Cokelat Tua)      : nomor, ikon IG/TikTok/YouTube/Shopee, tombol Pesan
Footer
```

### Produk
```
H1 Produk
┌─────────────── kartu varian (garis ganda) ───────────────┐
│ ╭───────╮   Varian Original Keju      [Best seller]      │
│ │ foto  │   Deskripsi dua kalimat.                       │
│ │ arch  │   Ukuran: (90 g) ( … )                         │
│ ╰───────╯   Rp xx.xxx                                    │
│             [ Pesan varian ini ]                         │
└──────────────────────────────────────────────────────────┘
(kartu Pedas dengan lencana Merah Cabai)
```
Ganjil dan genap bergantian posisi foto di komputer. Di ponsel selalu foto di atas.

### Halaman lain
- **Tentang Kami:** satu kolom bacaan 62ch, satu foto arch besar, angka "2012" sebagai penanda tahun berdiri, bukan sebagai statistik hiasan.
- **Pesan:** form pemesanan (lihat bagian 4) di atas, lalu langkah cara pemesanan vertikal bernomor di bawahnya (ini memang urutan), tiap langkah satu kalimat, dan tautan Shopee sebagai alternatif.
- **Kontak dan Lokasi:** kartu kontak di kiri, peta atau tombol Maps di kanan. Setiap kontak adalah tautan yang bisa disentuh (`tel:` dan WhatsApp).
- **Galeri:** kisi foto (2 kolom ponsel, 3 kolom komputer), lightbox saat diklik.

## 5a. Responsif dan lintas perangkat

Website harus nyaman di ponsel kecil sampai monitor lebar, portrait maupun landscape. Dirancang **mobile-first**: tata letak dasar adalah ponsel, layar lebih besar menambah kolom dan ruang, bukan membuat desain terpisah.

### Perangkat dan lebar target

| Kelompok | Lebar | Catatan |
|---|---|---|
| Ponsel kecil | 320–359 px | Tetap berfungsi penuh, tanpa gulir horizontal |
| Ponsel umum | 360–430 px | Acuan utama desain |
| Ponsel besar, ponsel lipat, ponsel landscape | 431–767 px | Satu kolom lebih lega, tinggi layar bisa hanya sekitar 360 px |
| Tablet portrait | 768–1023 px | Dua kolom di bagian tertentu, menu tetap ikon hamburger |
| Tablet landscape, laptop kecil | 1024–1279 px | Menu horizontal muncul |
| Desktop | 1280–1919 px | Konten maksimum 1120 px, di tengah |
| Monitor lebar | 1920 px ke atas | Konten tidak melebar; ruang sisi diisi warna latar |

Titik pindah (Tailwind v4): `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

### Perubahan tata letak per ukuran

| Bagian | Ponsel (< 768) | Tablet (768–1023) | Laptop dan desktop (≥ 1024) |
|---|---|---|---|
| Header | Logo + tombol menu; panel menu penuh layar | Sama seperti ponsel | Menu horizontal + tombol Pesan |
| Hero | Satu kolom: lencana di atas, judul, tombol lebar penuh | Dua kolom: teks kiri, lencana kanan | Dua kolom, lencana lebih besar |
| Kartu varian | Foto di atas, teks di bawah | Foto di samping teks | Foto di samping teks, ganjil/genap bergantian |
| Form pesanan | Satu kolom, lebar penuh | Satu kolom, maksimum 560 px, di tengah | Sama dengan tablet |
| Galeri | 2 kolom | 3 kolom | 3–4 kolom |
| Kontak | Kartu kontak lalu peta, bertumpuk | Berdampingan | Berdampingan |
| Footer | Bertumpuk, rata kiri | Dua kolom | Tiga kolom |

### Aturan umum
- **Tanpa gulir horizontal** dari 320 px. Wadah memakai lebar fluid (`%`, `rem`, `clamp`), bukan piksel tetap. Teks panjang seperti alamat dan URL memakai `overflow-wrap: anywhere`.
- **Viewport:** `width=device-width, initial-scale=1, viewport-fit=cover`. Pengguna tetap boleh memperbesar halaman (tidak ada `user-scalable=no`).
- **Safe area:** header, footer, dan tombol Pesan melayang memakai `env(safe-area-inset-*)` agar tidak tertutup poni atau bilah gestur.
- **Tinggi layar:** pakai `svh`/`dvh` dengan cadangan `vh` supaya bilah alamat Safari iOS tidak merusak tata letak. Hero memakai `min-height`, bukan tinggi tetap, agar tetap muat di ponsel landscape.
- **Orientasi:** portrait dan landscape didukung, tidak ada penguncian orientasi.
- **Zoom dan ukuran font sistem:** semua ukuran memakai `rem`. Layout tetap utuh pada zoom 200% dan font sistem diperbesar. Tambahkan `-webkit-text-size-adjust: 100%`.
- **Gambar:** `srcset` dan `sizes` untuk tiap lebar, `aspect-ratio` agar tidak melompat saat dimuat, `object-fit: cover` dengan titik fokus yang tidak memotong objek utama pada bentuk arch.
- **Konten lebar:** tidak ada tabel lebar. Bila perlu, bungkus dengan `overflow-x: auto` di dalam wadahnya sendiri.

### Sentuhan, keyboard, dan penunjuk
- Target sentuh minimal 44 × 44 px, jarak antar target minimal 8 px.
- Efek hover hanya di dalam `@media (hover: hover)`. Tidak ada fungsi yang hanya bisa diakses lewat hover.
- Tombol memakai `touch-action: manipulation` agar tidak ada jeda ketuk ganda. Warna sorotan ketuk disetel selaras palet (`-webkit-tap-highlight-color`).
- Isian form berukuran font minimal 16 px (mencegah iOS memperbesar layar sendiri), memakai tipe papan ketik yang tepat (`tel`, angka), dan `scroll-margin-top` sebesar tinggi header lengket supaya isian yang difokus tidak tertutup header atau keyboard.
- Menu ponsel: `aria-expanded`, fokus terkunci di panel saat terbuka, `Esc` menutup, gulir halaman di belakangnya dikunci, tombol tutup 48 px.
- Lightbox galeri: geser kiri/kanan di layar sentuh, tombol panah dan `Esc` di keyboard, tombol tutup besar di pojok.
- Tombol Pesan melayang berada di zona jempol (kanan bawah). Halaman diberi ruang kosong di bawah (sekitar 80 px) agar konten terakhir tidak tertutup.

### Performa di jaringan lambat
- Beranda: JavaScript awal ≤ 200 KB gzip dan total transfer awal sekitar 600 KB atau kurang (tanpa gambar yang dimuat lazy). Target LCP ≤ 2,5 detik pada ponsel kelas menengah dengan koneksi 4G.
- Font memakai `font-display: swap` dan subset Latin. Hanya foto di layar pertama yang dimuat segera.

### Kompatibilitas
- Chrome dan Safari (iOS 15 ke atas, Android 9 ke atas), serta Firefox, Edge, dan Samsung Internet (dua versi terakhir).
- Bentuk bergerigi memakai `mask` dengan awalan `-webkit-mask`, dengan cadangan sudut membulat biasa bila tidak didukung.
- Tema tunggal (tidak ada mode gelap); deklarasikan `color-scheme: light` agar peramban tidak membalik warna.
- Tautan WhatsApp (`wa.me`) bekerja di semua perangkat: di ponsel membuka aplikasi, di komputer membuka WhatsApp Web atau Desktop.

### Matriks uji
Lebar 320, 360, 390, 412, 768, 820, 1024, 1280, 1440, 1920 px. Landscape: 667 × 375 dan 844 × 390. Uji di emulator peramban, dan di perangkat nyata (minimal satu Android dan satu iPhone) sebelum peluncuran.

## 6. Gerak (GSAP)

Prinsip: **satu adegan otomatis, sisanya menjawab aksi pengguna.** Jangan menambahkan efek "muncul sambil naik" di setiap bagian atau efek hover di setiap kartu.

### Adegan tunggal: stempel di hero (saat halaman dibuka)
Urutan dengan satu `gsap.timeline`, total sekitar 1,6 detik:
1. Latar kuning sudah tampil. Judul muncul per baris dengan topeng (baris naik dari balik garis), 0,6 detik, berselang 0,08 detik.
2. Lencana mulai dari skala 1,25 dan rotasi −8°, lalu "menekan" ke skala 1 dan rotasi 0° (`power4.in`, 0,35 detik), memantul kecil (`back.out(2)`, 0,3 detik).
3. Saat menyentuh, tepi bergerigi bergetar halus (translasi ±2 px, 0,12 detik) dan tombol Pesan muncul.

Hanya dijalankan sekali per kunjungan. Pada kunjungan berikutnya dalam sesi yang sama dan pada `prefers-reduced-motion: reduce`, tampilkan keadaan akhir langsung tanpa animasi.

### Gerak yang menjawab aksi
- Tombol ditekan: turun 2 px, 120 ms.
- Chip ukuran dipilih: harga berganti dengan transisi singkat 150 ms.
- Menu ponsel terbuka dan tertutup: panel bergeser 280 ms, tautan muncul berurutan.
- Lightbox galeri: foto membesar dari posisi aslinya (teknik Flip), 300 ms.
- Form: galat muncul tanpa gerak; panel konfirmasi setelah pesan dibuat muncul dengan fade 200 ms. Tidak ada animasi lain di form.
- Header mengecil saat digulir: satu `ScrollTrigger`, hanya mengubah tinggi dan latar.

### Aturan teknis
- Gunakan `useGSAP` dari `@gsap/react` dan `gsap.matchMedia()` untuk memisahkan perilaku normal dan `prefers-reduced-motion`.
- Animasikan hanya `transform` dan `opacity`.
- Pastikan konten tetap terbaca jika JavaScript gagal dimuat.
- Tidak ada pustaka gerak lain.

## 7. Foto dan ilustrasi

- Foto produk asli dari owner (makaroni dalam mangkuk kayu, kemasan kuning, tangan memegang makaroni dengan cabai). Warna hangat, cahaya alami.
- Format WebP, lebar 480, 800, dan 1200 px dengan `srcset`. Foto hero dimuat segera, sisanya `loading="lazy"`.
- Semua foto punya teks alternatif yang menjelaskan isinya, misalnya "Makaroni keju varian pedas di atas kain dengan cabai merah".
- Logo wajib versi transparan (SVG ideal). Jangan memakai logo dengan latar gelap persegi.

## 8. Nada tulisan

Hangat, lugas, Bahasa Indonesia sehari-hari. Kalimat pendek, kata kerja aktif, tanpa janji berlebihan.

| Tempat | Contoh |
|---|---|
| Judul hero | Makaroni keju buatan Purwokerto, sejak 2012. |
| Subjudul | Renyah, gurih, kejunya terasa. Pesan langsung lewat WhatsApp. |
| Tombol utama | Pesan lewat WhatsApp |
| Tombol di kartu | Pesan varian ini |
| Tombol di form | Pesan lewat WhatsApp |
| Label isian | Nama pemesan, Varian rasa, Jumlah, Nomor telepon, Detail alamat |
| Contoh galat | Isi nama pemesan minimal 2 huruf. / Nomor telepon belum benar. Contoh: 0812 3456 7890. / Tulis alamat selengkapnya: jalan, nomor, kelurahan, kecamatan, dan kota. |
| Konfirmasi | Pesanan belum terkirim. Tekan Kirim di WhatsApp agar pesanan sampai ke kami. |
| Galat/kosong | Foto belum tersedia. Hubungi kami lewat WhatsApp untuk melihat contohnya. |

Nama tombol dan tindakan harus sama di seluruh situs. Jangan menulis klaim kesehatan atau sertifikasi yang belum dikonfirmasi owner.

## 9. Standar mutu

- Responsif mulai 320 px sampai 1920 px ke atas, tanpa gulir horizontal (lihat bagian 5a).
- Target sentuh minimal 44 × 44 px.
- Fokus keyboard terlihat (garis 3 px Cokelat Tua dengan offset 2 px; di latar gelap Kuning Keju).
- Kontras teks ≥ 4,5:1 sesuai tabel warna.
- `prefers-reduced-motion` dihormati, bukan hanya dikurangi.
- Struktur judul benar (satu H1 per halaman).
- Tautan eksternal memakai `rel="noopener noreferrer"`.

## 10. Alternatif desain untuk pemilihan owner (WBS 2.3)

Dokumen ini adalah **Alternatif A: "Label Kemasan"** (kuning dominan, bingkai ganda, arch, stempel). Bila diperlukan Alternatif B, arah yang cukup berbeda: **"Warung Cokelat"**, latar Cokelat Tua dominan, kuning sebagai sorotan, foto penuh lebar tanpa arch, tanpa bingkai ganda, dengan nada visual lebih gelap dan hangat. Struktur halaman dan fungsi tetap sama.
