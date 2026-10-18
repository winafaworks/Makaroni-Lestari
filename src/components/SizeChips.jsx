import React from "react";

/**
 * Pilihan Ukuran Kemasan (Chips Radio)
 */
export default function SizeChips({ sizes = [], selectedSize, onSelectSize, namePrefix = "size" }) {
  if (!sizes || sizes.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Pilih ukuran kemasan">
      <span className="text-sm font-medium text-karamel mr-1">Ukuran:</span>
      {sizes.map((sizeOption) => {
        const isSelected = selectedSize === sizeOption.label;
        return (
          <button
            key={sizeOption.label}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectSize(sizeOption.label)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer min-h-[36px] flex items-center justify-center border ${
              isSelected
                ? "bg-tua text-susu border-tua shadow-xs"
                : "bg-susu text-tua border-tua/40 hover:border-tua hover:bg-mentega/40"
            }`}
          >
            {sizeOption.label}
          </button>
        );
      })}
    </div>
  );
}
