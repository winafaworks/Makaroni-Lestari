# Panduan Pengelolaan Website Makaroni Keju Lestari

Selamat datang! Dokumen ini dibuat khusus untuk mempermudah pemilik/pengelola (*owner*) mengubah teks, harga produk, nomor WhatsApp, foto, dan varian rasa tanpa perlu keahlian teknis pemrograman.

Semua data yang dapat diubah disimpan rapi di dalam satu folder: **`src/content/`**.

---

## 1. Cara Mengubah Teks Informasi & Nomor WhatsApp

Buka berkas: **[site.js](file:///d:/Winafa%20Works/Proyek/Website/website%20makaroni/src/content/site.js)**

### Mengubah Nomor WhatsApp Admin
Cari baris `phone:`:
```javascript
phone: "6281904284264",
```
> **Penting:** Tulis nomor diawali dengan kode negara `62` tanpa tanda `+`, spasi, atau tanda hubung `-`. Contoh: `6281904284264`.

### Mengubah Jam Layanan & Alamat
Cari bagian:
```javascript
address: "Purwokerto, Kabupaten Banyumas, Jawa Tengah",
operatingHours: "Senin – Minggu: 08.00 – 17.00 WIB",
```
Ubah teks di dalam tanda kutip sesuai kebutuhan Anda.

### Mengubah Tautan Media Sosial
Cari bagian `socials`:
```javascript
socials: {
  instagram: "https://www.instagram.com/makaronikejulestari/",
  tiktok: "https://www.tiktok.com/@makaronikejulestari",
  shopee: "https://shopee.co.id/makaronikejulestari",
}
```

---

## 2. Cara Mengubah Harga atau Menambah Varian Baru

Buka berkas: **[products.js](file:///d:/Winafa%20Works/Proyek/Website/website%20makaroni/src/content/products.js)**

### Mengubah Harga Varian yang Ada
Cari varian yang ingin diubah, misalnya `Original Keju`, lalu ganti nilai `price`:
```javascript
sizes: [
  {
    label: "90 g",
    price: "Rp 15.000" // Ubah di sini
  }
]
```
*(Jika harga belum ingin ditampilkan, isi dengan `"TODO(OWNER)"`, maka website otomatis menampilkan "Hubungi kami untuk harga").*

### Menambah Varian Rasa Baru
Salin satu blok varian di dalam daftar `products` dan tempelkan di baris bawahnya:
```javascript
{
  id: "keju-pedas-manis",
  name: "Keju Pedas Manis",
  badge: "Varian Baru",
  isBestSeller: false,
  isSpicy: true,
  image: "/images/nama_foto_baru.webp",
  description: "Sensasi perpaduan gurih keju dengan rasa pedas manis yang lezat.",
  sizes: [
    {
      label: "90 g",
      price: "Rp 16.000"
    }
  ]
},
```

---

## 3. Cara Mengganti Foto Produk

1. Siapkan foto produk Anda (disarankan format `.webp` atau `.jpg`).
2. Masukkan file foto ke dalam folder: **`public/images/`**.
3. Di dalam berkas **[products.js](file:///d:/Winafa%20Works/Proyek/Website/website%20makaroni/src/content/products.js)**, ubah jalur gambar sesuai nama file baru:
   ```javascript
   image: "/images/nama_file_foto_baru.webp",
   ```

---

## 4. Cara Menyimpan Perubahan & Memperbarui Website

1. Simpan file yang telah diedit (`Ctrl + S`).
2. Jika website dihosting di platform otomatis seperti **Cloudflare Pages** atau **Netlify**:
   - Setiap Anda melakukan *commit / push* ke repository GitHub, website akan ter-update otomatis dalam 1–2 menit.
3. Untuk melihat perubahan di komputer lokal:
   ```bash
   npm run dev
   ```
   Buka alamat `http://localhost:5173/` di browser Anda.

---

## 5. Kontak Bantuan
Bila ada kendala teknis atau pertanyaan lebih lanjut seputar website, silakan hubungi tim pengembang proyek (Kelompok 6).
