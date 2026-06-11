import { describe, expect, it } from "vitest";
import {
  formatFullAddress,
  formatLocation,
  normalizePropertyCode,
  type Address,
} from "@/domain/property";

const baseAddress: Address = {
  street: "Rua Lauro Linhares",
  number: "589",
  complement: "Apto 301",
  neighborhood: "Trindade",
  city: "Florianópolis",
  state: "SC",
  postalCode: "88036-001",
};

describe("normalizePropertyCode", () => {
  it("remove espaços e converte para maiúsculas", () => {
    expect(normalizePropertyCode("  fln001 ")).toBe("FLN001");
  });
});

describe("formatFullAddress", () => {
  it("inclui o complemento quando presente", () => {
    expect(formatFullAddress(baseAddress)).toBe(
      "Rua Lauro Linhares, 589, Apto 301 — Trindade, Florianópolis - SC — CEP 88036-001",
    );
  });

  it("omite o complemento quando ausente", () => {
    expect(
      formatFullAddress({ ...baseAddress, complement: null }),
    ).toBe(
      "Rua Lauro Linhares, 589 — Trindade, Florianópolis - SC — CEP 88036-001",
    );
  });
});

describe("formatLocation", () => {
  it("resume bairro, cidade e estado", () => {
    expect(formatLocation(baseAddress)).toBe(
      "Trindade, Florianópolis - SC",
    );
  });
});
