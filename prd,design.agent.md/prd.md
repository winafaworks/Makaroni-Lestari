# PRD: Website Makaroni Keju Lestari Purwokerto

Versi 1.0 · 18 Oktober 2026 · Acuan: Scope Management Plan Kelompok 6 (17 Oktober 2026)

Dokumen ini menjelaskan **apa** yang dibangun dan **mengapa**. Tampilan ada di `design.md`. Aturan kerja untuk AI agent ada di `agent.md`.

---

## 1. Ringkasan

Makaroni Keju Lestari adalah usaha camilan makaroni keju dari Purwokerto yang berdiri sejak 2012. Produknya dijual lewat Instagram, TikTok, dan Shopee. Website lama (Google Sites) punya masalah: tampilan terkesan kurang profesional, harga tidak tampil, ikon di halaman depan tidak berfungsi, dan kontennya tidak seragam dengan company profile.

Website baru bertugas sebagai **etalase resmi** yang membuat pengunjung percaya, melihat varian dan harga, lalu **memesan lewat WhatsApp dalam satu klik**.

## 2. Tujuan dan ukuran keberhasilan

| Tujuan | Ukuran keberhasilan |
|---|---|
| Tampilan lebih profesional dari website lama | Owner memilih satu desain dan menilainya lebih baik dari tampilan lama (sign-off WhatsApp) |
| Pelanggan mudah memesan | Form pesanan (nama, varian, jumlah, telepon, alamat) membuka WhatsApp owner dengan isi form lengkap dan benar; 100% varian bisa dipilih di form dan punya tombol menuju form |
| Informasi produk lengkap dan benar | 100% varian, ukuran, dan harga sesuai data owner; tidak bertentangan dengan company profile |
| Semua kanal terhubung | 100% ikon dan tautan (Instagram, TikTok, YouTube, Shopee) membuka tujuan yang benar |
| Tanpa biaya bagi owner | Platform, hosting, dan alamat gratis; tanpa iklan di halaman pengunjung |
| Cepat di ponsel | Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 |

## 3. Di luar cakupan (out of scope)

- Keranjang belanja, pembayaran online, atau ongkir otomatis. Transaksi tetap lewat WhatsApp dan Shopee.
- Penyimpanan pesanan. Form pesanan hanya menyusun pesan WhatsApp; website tidak menyimpan, mengirim, atau mencatat data pembeli ke server mana pun.
- Domain berbayar (misalnya `.com`/`.id`). Memakai subdomain gratis. Domain sendiri bisa ditambahkan kemudian.
- Backend, database, atau login pengguna.
- Pemeliharaan rutin setelah serah terima.
- Pembuatan foto produk baru. Foto disediakan owner.

## 4. Pengguna

**Pembeli baru (utama).** Menemukan Lestari lewat Instagram atau TikTok, membuka tautan di bio dari ponsel. Ingin tahu rasa, ukuran, harga, lalu langsung memesan. Sabar maksimal beberapa detik.

**Pelanggan lama.** Sudah kenal rasanya. Ingin cepat menemukan tombol pesan dan nomor kontak.

**Owner (pengelola).** Bukan developer. Perlu mengubah teks dan harga sendiri setelah serah terima.

## 5. Halaman dan kebutuhan fungsional

Enam halaman sesuai WBS 3.2. Setiap kebutuhan punya ID agar bisa ditelusuri ke Requirements Traceability Matrix.

### 5.1 Beranda (WBS 3.2.1)
- **FR-01** Hero memuat nama usaha, penjelasan satu kalimat, tombol "Pesan lewat WhatsApp", dan lencana logo "Est. 2012".
- **FR-02** Ringkasan varian dengan foto, tautan ke halaman Produk.
- **FR-03** Blok singkat "Cara pesan" (3 langkah) dan ikon media sosial (Instagram, TikTok, YouTube) yang bisa diklik (WBS 3.5.1).
- **FR-04** Cuplikan galeri dan blok kontak singkat di bagian bawah.

### 5.2 Tentang Kami (3.2.2)
- **FR-05** Cerita usaha singkat, tahun berdiri 2012, lokasi Purwokerto, bahan dan cara pembuatan. Isi hanya yang dikonfirmasi owner.

### 5.3 Produk (3.2.3)
- **FR-06** Satu kartu per varian: nama, foto, deskripsi singkat, pilihan ukuran kemasan, harga untuk ukuran terpilih.
- **FR-07** Harga tampil jelas pada setiap ukuran (masalah utama website lama).
- **FR-08** Tombol "Pesan varian ini" pada setiap kartu varian menuju halaman form `/pesan?varian=<id>` dengan varian tersebut sudah terpilih (3.4.1).
- **FR-09** Pemesanan sesungguhnya dilakukan lewat form di bagian 5.4 (3.4.2).
- **FR-10** Varian yang sudah diketahui: Original Keju (kemasan 90 g, best seller) dan Pedas. Daftar lengkap menunggu data owner.

### 5.4 Pesan dan Cara Pemesanan (3.2.4, 3.4)

Halaman `/pesan` berisi form pesanan di bagian atas dan langkah singkat cara pemesanan di bawahnya. Semuanya statis, tanpa backend.

**Isian form**

| Isian | Jenis | Wajib | Aturan |
|---|---|---|---|
| Nama pemesan | teks | ya | 2–60 karakter |
| Varian rasa | pilihan satu (kartu radio) | ya | salah satu varian di `products.js`; terisi otomatis bila datang dari tombol "Pesan varian ini" |
| Jumlah produk | angka dengan tombol − dan + | ya | bilangan bulat 1–99 (batas bisa diubah owner di `site.js`), default 1 |
| Nomor telepon | telepon | ya | nomor seluler Indonesia: diawali `08`, `62`, atau `+62`, 10–13 digit; spasi dan tanda hubung diabaikan |
| Detail alamat | teks panjang | ya | 10–300 karakter (jalan, nomor, RT/RW, kelurahan, kecamatan, kota, kode pos) |
| Ukuran kemasan | pilihan satu | hanya bila varian punya lebih dari satu ukuran | muncul otomatis; tidak tampil bila hanya ada satu ukuran |

**Kebutuhan fungsional**

- **FR-11.1** Form memuat lima isian di atas. Isian ukuran kemasan hanya muncul bila diperlukan.
- **FR-11.2** Validasi berjalan di browser. Galat tampil di bawah isian yang bermasalah, dengan kalimat yang menjelaskan cara memperbaiki. Fokus berpindah ke isian pertama yang salah saat tombol ditekan.
- **FR-11.3** Tombol "Pesan lewat WhatsApp" hanya meneruskan bila seluruh isian valid. Isian yang salah tidak pernah membuka WhatsApp.
- **FR-11.4** Setelah valid, tombol membuka `https://wa.me/<nomor owner>?text=<pesan>` di tab baru. Pesan berisi seluruh isi form dengan format baku (lihat contoh di bawah).
- **FR-11.5** Setelah tombol ditekan, halaman menampilkan ringkasan pesanan, pengingat bahwa **pesanan baru terkirim setelah pembeli menekan Kirim di WhatsApp**, dan tautan cadangan "Buka WhatsApp lagi" bila WhatsApp tidak terbuka.
- **FR-11.6** Website tidak menyimpan data form (tanpa server, cookie, atau penyimpanan lokal). Di dekat tombol ada kalimat: data hanya dikirim lewat WhatsApp.
- **FR-11.7** Parameter URL `?varian=<id>` memilih varian awal. Id yang tidak dikenal diabaikan.
- **FR-11.8** Template pesan berada di `src/content/site.js` agar owner bisa mengubah kalimat pembuka dan penutup tanpa menyentuh logika.
- **FR-12** Di bawah form: langkah cara pemesanan (pilih varian, isi form, kirim pesan di WhatsApp, konfirmasi dan pembayaran dengan owner) serta tautan ke Shopee sebagai alternatif.

**Contoh pesan yang diterima owner**

```
Halo Lestari, saya mau pesan Makaroni Keju.

Nama: Siti Aminah
Varian rasa: Original Keju
Jumlah: 3
No. telepon: 0812 3456 7890
Alamat: Jl. Merdeka No. 12, RT 02/RW 03, Kel. Purwokerto Lor, Kec. Purwokerto Timur, Kab. Banyumas, 53111

Terima kasih.
```

### 5.5 Kontak dan Lokasi (3.2.5)
- **FR-13** Nomor WhatsApp, Instagram, TikTok, YouTube, Shopee, alamat, dan jam layanan (data owner).
- **FR-14** Tombol "Buka di Google Maps". Peta tertanam bersifat opsional dan dimuat lazy.

### 5.6 Galeri (3.2.6)
- **FR-15** Kisi foto produk dan suasana. Klik foto membuka tampilan besar (lightbox) yang bisa ditutup dengan keyboard.

### 5.7 Fitur di semua halaman
- **FR-16** Navigasi sederhana (6 halaman) yang berfungsi baik di ponsel.
- **FR-17** Tombol "Pesan" melayang di semua halaman kecuali halaman `/pesan` (3.4.3), menuju form pesanan. Halaman Kontak juga memuat tautan "Chat langsung" ke WhatsApp tanpa form untuk pertanyaan.
- **FR-18** Footer berisi identitas, tautan kanal, dan nomor kontak.

### 5.8 Teknis dan konten
- **FR-19** Semua teks, harga, varian, dan tautan berada di satu folder `src/content/` agar mudah diubah (kriteria serah terima 4.6.1: owner mengubah satu teks tanpa bantuan).
- **FR-20** Metadata SEO dasar per halaman, Open Graph untuk pratinjau tautan di WhatsApp/Instagram, dan data terstruktur bisnis lokal.
- **FR-21** Website lama tetap aktif sampai owner memutuskan. Tautan di Instagram, TikTok, Shopee, dan company profile diganti hanya setelah persetujuan tertulis (4.5).

## 6. Kebutuhan non-fungsional

- **Responsif dan lintas perangkat:** mobile-first, berfungsi penuh dari lebar 320 px sampai layar 1920 px ke atas, portrait dan landscape, di ponsel, tablet, laptop, dan komputer. Tanpa gulir horizontal, tanpa elemen terpotong, target sentuh ≥ 44 px, dan semua fungsi bisa dipakai tanpa hover. Rincian di `design.md` bagian 5a.
- **Performa:** gambar WebP, lazy loading, JavaScript awal ≤ 200 KB gzip, animasi hanya memakai `transform` dan `opacity`.
- **Aksesibilitas:** kontras teks ≥ 4,5:1, fokus keyboard terlihat, teks alternatif pada semua foto, `prefers-reduced-motion` dihormati.
- **Bahasa:** Bahasa Indonesia, nada hangat dan lugas.
- **Peramban dan sistem:** Chrome dan Safari (iOS 15 ke atas, Android 9 ke atas), serta Firefox, Edge, dan Samsung Internet (dua versi terakhir).
- **Biaya:** Rp0 untuk hosting dan alamat. Tidak ada iklan platform di halaman pengunjung.

## 7. Teknologi

| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | React 18+ dengan Vite | Cepat dibangun, komponen bisa dipakai ulang, hasil berupa file statis |
| Animasi | GSAP (`gsap` dan `@gsap/react`) | Kontrol penuh untuk satu adegan pembuka yang berkesan; plugin gratis |
| Gaya | Tailwind CSS v4 dengan token di `design.md` | Konsisten dan ringan |
| Routing | React Router | Enam halaman sesuai WBS |
| Hosting | Cloudflare Pages atau Netlify (gratis) | Subdomain gratis, HTTPS otomatis, cocok untuk penggunaan komersial |

Catatan: paket gratis Vercel Hobby ditujukan untuk penggunaan non-komersial, jadi tidak disarankan untuk usaha ini. Pastikan syarat layanan hosting yang dipilih masih mengizinkan penggunaan komersial.

**Risiko teknologi dan mitigasinya**

| Risiko | Mitigasi |
|---|---|
| Owner non-teknis sulit mengubah teks di proyek React | Semua konten di satu folder dengan komentar jelas, ditambah panduan owner bergambar. Opsional: Decap CMS (butuh pengaturan login GitHub) |
| SEO situs React murni lebih lemah | Prarender halaman statis (misalnya `vite-react-ssg`) atau pertimbangkan Astro dengan komponen React |
| Animasi memberatkan ponsel murah | Satu animasi otomatis saja, sisanya hanya merespons aksi pengguna |
| Pembeli mengira pesanan sudah terkirim padahal belum | Layar konfirmasi menjelaskan bahwa pesan baru terkirim setelah menekan Kirim di WhatsApp. Owner tidak menerima apa pun sebelum itu |
| Pembeli tidak punya WhatsApp atau aplikasinya gagal terbuka | Tautan cadangan, serta tautan Shopee sebagai jalur lain |
| Nomor telepon salah format | Validasi dan normalisasi di browser (`08...` menjadi `62...` untuk tautan, isi pesan tetap seperti yang diketik) |

## 8. Data yang dibutuhkan dari owner

Semua bertanda `TODO(OWNER)` di kode sampai terisi. **Agent tidak boleh mengarang data ini.**

- [ ] Nomor WhatsApp (format `62...`)
- [ ] Daftar lengkap varian rasa, ukuran kemasan, dan harga
- [ ] Alamat, jam layanan, dan tautan Google Maps
- [ ] Tautan resmi: Instagram (`@makaronikejulestari`), TikTok, YouTube, Shopee
- [ ] Logo transparan (SVG/PNG) dan foto produk beresolusi baik
- [ ] Cerita usaha dan klaim produk yang boleh ditampilkan (halal, bahan, masa simpan)
- [ ] Informasi pembayaran dan pengiriman
- [ ] Nama subdomain yang diinginkan

## 9. Tonggak dan persetujuan

Mengikuti tiga titik validasi di Scope Management Plan.

1. **Desain:** owner memilih satu desain lewat WhatsApp (tangkapan layar disimpan).
2. **Fungsi:** uji klik semua tombol WhatsApp dan ikon di ponsel dan komputer.
3. **Peluncuran:** persetujuan tertulis owner, lalu publikasi, penggantian tautan kanal, dan serah terima akses dengan berita acara.

## 10. Pertanyaan terbuka

1. Apakah Shopee menjadi jalur pesan utama atau hanya tambahan?
2. Apakah ada produk selain makaroni keju yang perlu tampil?
3. Apakah ukuran kemasan perlu dipilih di form? Default: isian ukuran hanya muncul bila varian punya lebih dari satu ukuran.
5. Berapa jumlah minimum dan maksimum per pesanan? Default form: 1–99.
6. Apakah form perlu menampilkan perkiraan harga produk (belum termasuk ongkir)? Bersifat opsional, hanya tampil bila harga sudah terisi.
4. Bagaimana alur setelah serah terima bila owner ingin mengubah konten (sendiri atau lewat tim)?
