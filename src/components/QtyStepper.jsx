import React from "react";

/**
 * Pengatur Jumlah Produk (− dan +)
 * Ukuran minimal touch target 48x48 px sesuai design.md
 */
export default function QtyStepper({ value, onChange, min = 1, max = 99, disabled = false }) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      onChange("");
    } else {
      onChange(Math.max(min, Math.min(max, val)));
    }
  };

  return (
    <div className="inline-flex items-center border-2 border-tua rounded-md bg-susu overflow-hidden">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Kurangi jumlah"
        className="w-12 h-12 flex items-center justify-center font-bold text-xl text-tua bg-mentega/40 hover:bg-mentega active:bg-mentega/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-r border-tua/20"
      >
        −
      </button>

      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        aria-label="Jumlah kemasan"
        className="w-16 h-12 text-center font-bold text-lg text-tua bg-transparent focus:outline-hidden tabular-nums"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Tambah jumlah"
        className="w-12 h-12 flex items-center justify-center font-bold text-xl text-tua bg-mentega/40 hover:bg-mentega active:bg-mentega/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-l border-tua/20"
      >
        +
      </button>
    </div>
  );
}
