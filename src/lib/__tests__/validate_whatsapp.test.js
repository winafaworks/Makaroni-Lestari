import { describe, it, expect } from "vitest";
import { validateOrderForm, PHONE_RE, sanitizePhone } from "../validate";
import { buildOrderMessage, buildOrderLink, getCleanDestinationPhone } from "../whatsapp";

describe("Validation Logic (validateOrderForm)", () => {
  const validOrder = {
    name: "Siti Aminah",
    variant: "original",
    qty: 3,
    phone: "0812 3456 7890",
    address: "Jl. Merdeka No. 12, RT 02/RW 03, Purwokerto Lor, Banyumas"
  };

  it("passes validation with completely valid data", () => {
    const errors = validateOrderForm(validOrder);
    expect(Object.keys(errors).length).toBe(0);
  });

  it("validates phone formats correctly", () => {
    // Valid Indonesian numbers
    expect(PHONE_RE.test(sanitizePhone("0812 3456 7890"))).toBe(true);
    expect(PHONE_RE.test(sanitizePhone("+62 812-3456-7890"))).toBe(true);
    expect(PHONE_RE.test(sanitizePhone("6281234567890"))).toBe(true);
    expect(PHONE_RE.test(sanitizePhone("085812345678"))).toBe(true);

    // Invalid numbers
    expect(PHONE_RE.test(sanitizePhone("12345"))).toBe(false);
    expect(PHONE_RE.test(sanitizePhone("0712345678"))).toBe(false);
    expect(PHONE_RE.test(sanitizePhone("0812abc456"))).toBe(false);
    expect(PHONE_RE.test(sanitizePhone(""))).toBe(false);
  });

  it("rejects invalid quantity values (0, 100, 2.5, and NaN)", () => {
    expect(validateOrderForm({ ...validOrder, qty: 0 }).qty).toBeDefined();
    expect(validateOrderForm({ ...validOrder, qty: 100 }).qty).toBeDefined();
    expect(validateOrderForm({ ...validOrder, qty: 2.5 }).qty).toBeDefined();
    expect(validateOrderForm({ ...validOrder, qty: "" }).qty).toBeDefined();
  });

  it("rejects short or empty name and address", () => {
    expect(validateOrderForm({ ...validOrder, name: "A" }).name).toBeDefined();
    expect(validateOrderForm({ ...validOrder, name: "   " }).name).toBeDefined();
    expect(validateOrderForm({ ...validOrder, address: "Singkat" }).address).toBeDefined();
  });

  it("rejects unknown variant id", () => {
    expect(validateOrderForm({ ...validOrder, variant: "unknown-snack" }).variant).toBeDefined();
  });
});

describe("WhatsApp Message Builder (buildOrderMessage & buildOrderLink)", () => {
  it("generates correct message string with multiline address intact", () => {
    const order = {
      name: "Budi Santoso",
      variant: "Original Keju",
      size: "90 g",
      qty: 2,
      phone: "0812 9876 5432",
      address: "Jl. Gatot Subroto No. 45\nPurwokerto Timur\nKode Pos 53114"
    };

    const message = buildOrderMessage(order);
    expect(message).toContain("Hallo Makaroni Keju Lestari, saya mau pesan Makaroni Keju.");
    expect(message).toContain("Nama: Budi Santoso");
    expect(message).toContain("Varian rasa: Original Keju");
    expect(message).toContain("Ukuran: 90 g");
    expect(message).toContain("Jumlah: 2");
    expect(message).toContain("No. telepon: 0812 9876 5432");
    expect(message).toContain("Alamat: Jl. Gatot Subroto No. 45\nPurwokerto Timur\nKode Pos 53114");
    expect(message).toContain("Terima kasih.");
  });

  it("encodes special characters (&, #, %, newline, emoji) safely for wa.me URL", () => {
    const order = {
      name: "Toko & Café #1",
      variant: "Original & Pedas",
      qty: 1,
      phone: "081234567890",
      address: "Kompleks Ruko 50% Diskon 🧀"
    };

    const url = buildOrderLink(order);
    expect(url.startsWith("https://wa.me/")).toBe(true);
    expect(url).toContain("%26"); // &
    expect(url).toContain("%23"); // #
    expect(url).toContain("%25"); // %
    expect(url).not.toContain("🧀"); // emoji encoded
  });

  it("cleans and sanitizes destination phone properly", () => {
    expect(getCleanDestinationPhone("6281904284264")).toBe("6281904284264");
    expect(getCleanDestinationPhone("+62 819-0428-4264")).toBe("6281904284264");
    expect(getCleanDestinationPhone("TODO(OWNER)")).toBe("");
    expect(getCleanDestinationPhone("")).toBe("");
  });
});
