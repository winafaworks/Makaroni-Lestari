/**
 * Konfigurasi Utama & Teks Website Makaroni Keju Lestari
 * 
 * CATATAN UNTUK OWNER:
 * Anda dapat mengubah teks, tautan sosial media, dan nomor WhatsApp di berkas ini.
 * Pastikan nomor WhatsApp menggunakan format internasional tanpa tanda + (contoh: 6281234567890).
 */

export const site = {
  name: "Makaroni Keju Lestari",
  tagline: "Renyah, gurih, kejunya terasa.",
  yearEstablished: "2012",
  city: "Purwokerto",
  province: "Jawa Tengah",
  
  // Nomor WhatsApp admin pemesanan (format: 628xxxxxxxxxx)
  phone: "6281904284264",
  
  // Alamat fisik / workshop
  // TODO(OWNER): Masukkan alamat lengkap toko atau rumah produksi
  address: "Purwokerto, Kabupaten Banyumas, Jawa Tengah",
  addressDetail: "TODO(OWNER)",
  mapsUrl: "https://maps.google.com/?q=Purwokerto+Banyumas",
  
  // Jam operasional
  // TODO(OWNER): Konfirmasi jam layanan
  operatingHours: "Senin – Minggu: 08.00 – 17.00 WIB",
  
  // Tautan Media Sosial Resmi
  socials: {
    instagram: "https://www.instagram.com/makaronikejulestari/",
    tiktok: "https://www.tiktok.com/@makaroni.keju.les?_r=1&_t=ZS-96nIfsLDGIH",
    youtube: "https://www.youtube.com/@produsenmakananringanlesta9233",
    shopee: "https://shopee.co.id/makaronikejulestari?mmp_pid=an_11036200022&uls_trackid=56tiffnc07lo&utm_campaign=-&utm_content=-&utm_medium=affiliates&utm_source=an_11036200022&utm_term=fpw1bj4s62ij"
  },

  // Batas jumlah pemesanan pada form (default: 1 - 99)
  minQty: 1,
  maxQty: 99,

  // Template pesan WhatsApp
  orderTemplate: {
    opening: "Halo Lestari, saya mau pesan Makaroni Keju.",
    closing: "Terima kasih."
  },

  // Cerita singkat usaha (Halaman Tentang Kami)
  story: [
    "Selamat datang di dunia kelezatan Makaroni Keju Lestari! Kami berawal dari sebuah mimpi sederhana: menghadirkan camilan home made dengan sentuhan modern yang tidak hanya memanjakan lidah, tetapi juga membawa kebahagiaan di setiap gigitannya. Kami percaya bahwa camilan berkualitas adalah teman terbaik dalam setiap momen berharga Anda, baik saat berkumpul bersama keluarga, bekerja, maupun bersantai.",
    "Mengapa Memilih Lestari? karena kualitas adalah prioritas utama kami. Makaroni Keju Lestari dibuat secara higienis menggunakan bahan-bahan pilihan terbaik dan keju asli berkualitas tinggi. Kami memastikan setiap proses produksi menjaga standar kebersihan dan kesehatan, sehingga menghasilkan tekstur makaroni yang renyah sempurna dengan bumbu yang meresap rasa gurihnya.",
    "Camilan kami dirancang untuk bisa dinikmati oleh siapa saja. Tanpa bahan pengawet berbahaya, Makaroni Keju Lestari menjadi pilihan camilan sehat yang aman dikonsumsi oleh semua kalangan usia—mulai dari anak-anak hingga dewasa. Dengan berbagai inovasi varian rasa (Original, Pedas, Balado, Jagung bakar hingga Cokelat), kami berkomitmen untuk terus melestarikan cita rasa camilan bermutu tinggi yang selalu dirindukan."
  ]
};
