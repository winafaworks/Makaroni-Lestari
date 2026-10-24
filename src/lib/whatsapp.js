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
 * Resolusi gerbang & obfuskasi nomor WhatsApp tujuan
 * Mencegah bot scraper / web crawler mendeteksi pola tautan nomor tujuan secara statis dari berkas script.
 */
function resolveWhatsAppGateway() {
  if (typeof atob === "function") {
    return atob("aHR0cHM6Ly93YS5tZS8="); // "https://wa.me/"
  }
  return "https://wa.me/";
}

/**
 * Mengambil dan membersihkan nomor telepon tujuan dari konfigurasi
 */
export function getCleanDestinationPhone(rawPhone = site.phone) {
  if (!rawPhone || String(rawPhone).includes("TODO")) return "";
  return String(rawPhone).replace(/\D/g, "");
}

/**
 * Membuat tautan wa.me lengkap dengan query param teks
 */
export function buildOrderLink(order) {
  const message = buildOrderMessage(order);
  const targetPhone = getCleanDestinationPhone(site.phone);
  return `${resolveWhatsAppGateway()}${targetPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Tautan chat langsung tanpa template form (untuk halaman Kontak / Tanya Cepat)
 */
export function directChatLink() {
  const targetPhone = getCleanDestinationPhone(site.phone);
  return `${resolveWhatsAppGateway()}${targetPhone}`;
}
