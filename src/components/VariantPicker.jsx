import React from "react";
import { products } from "../content/products";
import { IconCheck } from "./icons/Icons";

/**
 * Pemilih Varian Rasa dalam Bentuk Kartu Radio
 * Foto kecil arch + nama varian + indikator centang terpilih
 */
export default function VariantPicker({ selectedId, onChange, error = null }) {
  return (
    <div className="space-y-2">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        role="radiogroup"
        aria-label="Pilih varian rasa makaroni"
      >
        {products.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <label
              key={item.id}
              className={`relative flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all border-2 ${
                isSelected
                  ? "border-tua bg-mentega shadow-sm ring-2 ring-tua/20"
                  : "border-tua/40 bg-susu hover:border-tua hover:bg-mentega/30"
              }`}
            >
              <input
                type="radio"
                name="variant"
                value={item.id}
                checked={isSelected}
                onChange={() => onChange(item.id)}
                className="sr-only"
                aria-describedby={error ? "variant-error" : undefined}
              />

              {/* Square Mini Photo */}
              <div className="w-12 h-12 bg-mentega border border-tua/40 rounded-sm overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="48"
                  height="56"
                />
              </div>

              {/* Variant Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-sm text-tua leading-tight">
                    {item.name}
                  </span>
                  {item.isSpicy && (
                    <span className="text-[10px] bg-cabai text-susu font-bold px-1.5 py-0.5 rounded-sm uppercase">
                      Pedas
                    </span>
                  )}
                </div>
                <span className="text-xs text-karamel block mt-0.5 truncate">
                  {item.sizes?.[0]?.label || "Kemasan 90 g"}
                </span>
              </div>

              {/* Checkmark Indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                  isSelected
                    ? "bg-tua text-susu border-tua"
                    : "border-tua/30 bg-transparent text-transparent"
                }`}
              >
                <IconCheck className="w-3.5 h-3.5" />
              </div>
            </label>
          );
        })}
      </div>

      {error && (
        <p id="variant-error" className="text-xs text-tua font-semibold mt-1 flex items-center gap-1">
          <span className="text-cabai font-bold">●</span> {error}
        </p>
      )}
    </div>
  );
}
