import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../content/products";
import { site } from "../content/site";
import { validateOrderForm } from "../lib/validate";
import { buildOrderLink } from "../lib/whatsapp";
import VariantPicker from "./VariantPicker";
import QtyStepper from "./QtyStepper";
import SizeChips from "./SizeChips";
import OrderSummary from "./OrderSummary";
import { IconWhatsApp, IconAlert } from "./icons/Icons";

/**
 * Form Pemesanan Makaroni Keju Lestari
 * Berada di dalam frame-kemasan, statis, tanpa backend, langsung ke WhatsApp.
 */
export default function OrderForm() {
  const [searchParams] = useSearchParams();
  const urlVariant = searchParams.get("varian");

  // Inisialisasi varian default
  const initialVariant = products.find((p) => p.id === urlVariant)?.id || products[0]?.id || "";

  const [values, setValues] = useState({
    name: "",
    variant: initialVariant,
    size: "",
    qty: 1,
    phone: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const [sentData, setSentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);

  // Periksa apakah varian terpilih memiliki variasi ukuran
  const currentProduct = products.find((p) => p.id === values.variant);
  const hasMultipleSizes = currentProduct?.sizes && currentProduct.sizes.length > 1;

  // Set ukuran default saat varian berganti
  useEffect(() => {
    if (currentProduct?.sizes && currentProduct.sizes.length > 0) {
      setValues((prev) => ({
        ...prev,
        size: currentProduct.sizes[0].label
      }));
    }
  }, [values.variant]);

  // Update varian jika URL param berubah
  useEffect(() => {
    if (urlVariant && products.some((p) => p.id === urlVariant)) {
      setValues((prev) => ({ ...prev, variant: urlVariant }));
    }
  }, [urlVariant]);

  const handleBlur = (field) => {
    const validationErrors = validateOrderForm(values);
    if (validationErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah nomor WhatsApp owner masih placeholder TODO
    const isOwnerPhoneMissing = !site.phone || site.phone.includes("TODO");
    if (isOwnerPhoneMissing) {
      alert("Pemberitahuan: Nomor WhatsApp owner belum diisi di konfigurasi (site.js).");
      return;
    }

    const validationErrors = validateOrderForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Fokuskan ke isian pertama yang salah
      if (validationErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (validationErrors.phone && phoneInputRef.current) {
        phoneInputRef.current.focus();
      } else if (validationErrors.address && addressInputRef.current) {
        addressInputRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      name: values.name,
      variant: currentProduct ? currentProduct.name : values.variant,
      size: hasMultipleSizes ? values.size : null,
      qty: values.qty,
      phone: values.phone,
      address: values.address
    };

    const targetUrl = buildOrderLink(orderPayload);

    // Buka WhatsApp di tab baru tanpa await untuk mencegah popup blocker
    window.open(targetUrl, "_blank", "noopener,noreferrer");

    setSentData({
      url: targetUrl,
      values,
      variantName: currentProduct ? currentProduct.name : values.variant
    });

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSentData(null);
    setErrors({});
  };

  const isOwnerPhoneMissing = !site.phone || site.phone.includes("TODO");

  if (sentData) {
    return (
      <div className="max-w-[560px] mx-auto w-full">
        <OrderSummary sentData={sentData} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="max-w-[560px] mx-auto w-full frame-kemasan rounded-sm p-6 sm:p-8 shadow-sm">
      <div className="mb-6 pb-4 border-b border-tua/15">
        <h2 className="font-judul text-2xl sm:text-3xl text-tua">
          Form Pemesanan
        </h2>
        <p className="text-xs sm:text-sm text-karamel mt-1">
          Lengkapi data di bawah ini, pesanan akan diteruskan langsung ke WhatsApp admin Lestari.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        {/* 1. Nama Pemesan */}
        <div>
          <label htmlFor="order-name" className="block text-sm font-bold text-tua mb-1.5">
            Nama Pemesan <span className="text-cabai">*</span>
          </label>
          <input
            ref={nameInputRef}
            id="order-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Contoh: Siti Aminah"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            onBlur={() => handleBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full h-12 px-3.5 rounded-xs bg-susu border-2 ${
              errors.name ? "border-cabai ring-1 ring-cabai" : "border-tua"
            } text-tua focus:outline-hidden focus:ring-3 focus:ring-tua/30 transition-all`}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-tua font-semibold mt-1 flex items-center gap-1">
              <span className="text-cabai font-bold">●</span> {errors.name}
            </p>
          )}
        </div>

        {/* 2. Varian Rasa */}
        <div>
          <label className="block text-sm font-bold text-tua mb-1.5">
            Varian Rasa <span className="text-cabai">*</span>
          </label>
          <VariantPicker
            selectedId={values.variant}
            onChange={(id) => setValues({ ...values, variant: id })}
            error={errors.variant}
          />
        </div>

        {/* 3. Pilihan Ukuran (Jika ada lebih dari satu) */}
        {hasMultipleSizes && (
          <div>
            <SizeChips
              sizes={currentProduct.sizes}
              selectedSize={values.size}
              onSelectSize={(s) => setValues({ ...values, size: s })}
              namePrefix="order-form-size"
            />
            {errors.size && (
              <p className="text-xs text-tua font-semibold mt-1">
                <span className="text-cabai font-bold">●</span> {errors.size}
              </p>
            )}
          </div>
        )}

        {/* 4. Jumlah Produk */}
        <div>
          <label className="block text-sm font-bold text-tua mb-1.5">
            Jumlah Bungkus <span className="text-cabai">*</span>
          </label>
          <div className="flex items-center gap-4">
            <QtyStepper
              value={values.qty}
              min={site.minQty || 1}
              max={site.maxQty || 99}
              onChange={(newQty) => setValues({ ...values, qty: newQty })}
            />
            <span className="text-xs text-karamel">
              Batas per pemesanan: {site.minQty || 1}–{site.maxQty || 99} bungkus
            </span>
          </div>
          {errors.qty && (
            <p className="text-xs text-tua font-semibold mt-1 flex items-center gap-1">
              <span className="text-cabai font-bold">●</span> {errors.qty}
            </p>
          )}
        </div>

        {/* 5. Nomor Telepon */}
        <div>
          <label htmlFor="order-phone" className="block text-sm font-bold text-tua mb-1.5">
            Nomor Telepon / WhatsApp <span className="text-cabai">*</span>
          </label>
          <input
            ref={phoneInputRef}
            id="order-phone"
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0812 3456 7890"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            onBlur={() => handleBlur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`w-full h-12 px-3.5 rounded-xs bg-susu border-2 ${
              errors.phone ? "border-cabai ring-1 ring-cabai" : "border-tua"
            } text-tua focus:outline-hidden focus:ring-3 focus:ring-tua/30 transition-all`}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-tua font-semibold mt-1 flex items-center gap-1">
              <span className="text-cabai font-bold">●</span> {errors.phone}
            </p>
          )}
        </div>

        {/* 6. Detail Alamat */}
        <div>
          <label htmlFor="order-address" className="block text-sm font-bold text-tua mb-1.5">
            Detail Alamat Pengiriman <span className="text-cabai">*</span>
          </label>
          <textarea
            ref={addressInputRef}
            id="order-address"
            name="address"
            rows="3"
            autoComplete="street-address"
            placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota, kode pos"
            value={values.address}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
            onBlur={() => handleBlur("address")}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            className={`w-full p-3 rounded-xs bg-susu border-2 ${
              errors.address ? "border-cabai ring-1 ring-cabai" : "border-tua"
            } text-tua focus:outline-hidden focus:ring-3 focus:ring-tua/30 transition-all resize-y`}
          ></textarea>
          {errors.address && (
            <p id="address-error" className="text-xs text-tua font-semibold mt-1 flex items-center gap-1">
              <span className="text-cabai font-bold">●</span> {errors.address}
            </p>
          )}
        </div>

        {/* Tombol Pesan WhatsApp */}
        <div className="pt-2">
          {isOwnerPhoneMissing ? (
            <div className="p-3 bg-mentega/40 border border-tua/30 rounded-md text-xs text-tua text-center">
              ⚠️ Nomor WhatsApp admin belum diisi di konfigurasi owner. Tombol pemesanan dinonaktifkan sementara.
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-press w-full min-h-[48px] py-3.5 px-6 rounded-full bg-tua text-susu font-bold text-base hover:bg-karamel transition-all duration-150 cursor-pointer flex items-center justify-center gap-2.5 shadow-sm"
            >
              <IconWhatsApp className="w-5 h-5 text-keju" />
              <span>{isSubmitting ? "Membuka WhatsApp…" : "Pesan lewat WhatsApp"}</span>
            </button>
          )}

          {/* Kalimat Keterangan Privasi */}
          <p className="text-[11px] text-karamel text-center mt-2.5">
            Data hanya dikirim langsung lewat aplikasi WhatsApp dan tidak disimpan di website.
          </p>
        </div>
      </form>
    </div>
  );
}
