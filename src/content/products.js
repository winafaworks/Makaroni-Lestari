/**
 * Daftar Varian Produk Makaroni Keju Lestari
 * 
 * CATATAN UNTUK OWNER:
 * Untuk menambah varian baru, Anda cukup menyalin salah satu blok varian di bawah ini.
 * Jika harga belum diisi atau bernilai "TODO(OWNER)", website otomatis menampilkan keterangan
 * "Hubungi kami untuk harga" secara rapi kepada pengunjung.
 */

export const products = [
  {
    id: "original",
    name: "Original Keju",
    badge: "Best Seller",
    isBestSeller: true,
    isSpicy: false,
    image: "/images/makaroni_keju_original.webp",
    images: [
      "/images/makaroni_keju_original.webp",
      "/images/produk_kemasan_lestari.webp"
    ],
    description: "Varian legendaris dengan cita rasa keju gurih klasik. Renyah di setiap gigitan, tidak bikin serik, dan disukai semua usia.",
    sizes: [
      {
        label: "90 g",
        price: "17k"
      }
    ]
  },
  {
    id: "pedas-gurih",
    name: "Pedas Gurih",
    badge: "Favorit Pedas",
    isBestSeller: false,
    isSpicy: true,
    image: "/images/makaroni_keju_pedas_gurih.webp",
    description: "Perpaduan gurihnya keju dan sensasi pedas cabai yang menggugah selera. Rasa pedasnya pas dan bikin nagih.",
    sizes: [
      {
        label: "90 g",
        price: "17k"
      }
    ]
  },
  {
    id: "balado",
    name: "Balado Spesial",
    badge: null,
    isBestSeller: false,
    isSpicy: true,
    image: "/images/makaroni_keju_balado.webp",
    description: "Bumbu balado merah manis pedas berpadu gurih renyahnya makaroni keju. Cocok untuk teman santai sore hari.",
    sizes: [
      {
        label: "90 g",
        price: "17k"
      }
    ]
  },
  {
    id: "jagung-bakar",
    name: "Jagung Bakar",
    badge: null,
    isBestSeller: false,
    isSpicy: false,
    image: "/images/makaroni_keju_jagung_bakar.webp",
    description: "Aroma khas jagung bakar manis gurih yang menyatu dengan keju. Pilihan favorit anak-anak dan keluarga.",
    sizes: [
      {
        label: "90 g",
        price: "17k"
      }
    ]
  },
  {
    id: "coklat",
    name: "Cokelat Manis",
    badge: null,
    isBestSeller: false,
    isSpicy: false,
    image: "/images/makaroni_keju_coklat.webp",
    description: "Sensasi unik makaroni renyah dibalut cokelat manis legit. Kombinasi manis gurih yang renyah dan nagih.",
    sizes: [
      {
        label: "90 g",
        price: "17k"
      }
    ]
  },
  {
    id: "daun-seledri",
    name: "Keju Seledri Gurih",
    badge: null,
    isBestSeller: false,
    isSpicy: false,
    image: "/images/makaroni_keju_daun_seledri.webp",
    description: "Sentuhan rempah daun seledri segar yang menambah keharuman dan kenikmatan gurih pada makaroni keju.",
    sizes: [
      {
        label: "90 g",
        price: "17k"
      }
    ]
  }
];
