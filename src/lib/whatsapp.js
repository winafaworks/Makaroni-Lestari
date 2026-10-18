import { site } from "../content/site";

const clean = (s) => String(s || "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

/**
 * Menyusun template pesan WhatsApp sesuai format standar
 */
export function buildOrderMessage({ name, variant, size, qty, phone, address }) {
  return [
    site.orderTemplate.opening,
    "",
    `Nama: ${clean(name)}`,
    `Varian rasa: ${variant}`,
    size ? `Ukuran: ${size}` : null,
    `Jumlah: ${qty}`,
    `No. telepon: ${clean(phone)}`,
    `Alamat: ${clean(address)}`,
    "",
    site.orderTemplate.closing,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/**
 * Membuat tautan wa.me lengkap dengan query param teks
 */
export function buildOrderLink(order) {
  const message = buildOrderMessage(order);
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Tautan chat langsung tanpa template form (untuk halaman Kontak / Tanya Cepat)
 */
export function directChatLink() {
  return `https://wa.me/${site.phone}`;
}
