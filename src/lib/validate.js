import { products } from "../content/products";
import { site } from "../content/site";

export const PHONE_RE = /^(?:\+?62|0)8[1-9]\d{6,11}$/;

/**
 * Membersihkan nomor telepon dari spasi, titik, dan tanda hubung
 */
export function sanitizePhone(phone) {
  if (!phone) return "";
  return String(phone).replace(/[\s.\-]+/g, "").trim();
}

/**
 * Validasi isian form pemesanan
 * @param {Object} values 
 * @returns {Object} errors
 */
export function validateOrderForm(values) {
  const errors = {};

  // 1. Validasi Nama
  const trimmedName = (values.name || "").trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.name = "Isi nama pemesan minimal 2 huruf.";
  } else if (trimmedName.length > 60) {
    errors.name = "Nama pemesan maksimal 60 karakter.";
  }

  // 2. Validasi Varian
  const selectedProduct = products.find((p) => p.id === values.variant);
  if (!selectedProduct) {
    errors.variant = "Pilih varian rasa.";
  }

  // 3. Validasi Ukuran (Hanya jika varian punya > 1 ukuran)
  if (selectedProduct && selectedProduct.sizes && selectedProduct.sizes.length > 1) {
    if (!values.size || !selectedProduct.sizes.some((s) => s.label === values.size)) {
      errors.size = "Pilih ukuran kemasan.";
    }
  }

  // 4. Validasi Jumlah
  const qty = Number(values.qty);
  const minQty = site.minQty || 1;
  const maxQty = site.maxQty || 99;
  if (!Number.isInteger(qty) || qty < minQty || qty > maxQty) {
    errors.qty = `Jumlah harus antara ${minQty} dan ${maxQty}.`;
  }

  // 5. Validasi Nomor Telepon
  const cleanPhone = sanitizePhone(values.phone);
  if (!cleanPhone || !PHONE_RE.test(cleanPhone)) {
    errors.phone = "Nomor telepon belum benar. Contoh: 0812 3456 7890.";
  }

  // 6. Validasi Alamat
  const trimmedAddress = (values.address || "").trim();
  if (!trimmedAddress || trimmedAddress.length < 10) {
    errors.address = "Tulis alamat selengkapnya: jalan, nomor, kelurahan, kecamatan, dan kota.";
  } else if (trimmedAddress.length > 300) {
    errors.address = "Detail alamat maksimal 300 karakter.";
  }

  return errors;
}
