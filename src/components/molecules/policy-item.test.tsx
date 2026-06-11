import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PolicyItem } from "@/components/molecules/policy-item";

describe("PolicyItem", () => {
  it("indica quando a política é permitida", () => {
    render(<PolicyItem label="Animais de estimação" allowed />);

    expect(screen.getByText("Animais de estimação")).toBeInTheDocument();
    expect(screen.getByText("permitido")).toBeInTheDocument();
  });

  it("indica quando a política não é permitida", () => {
    render(<PolicyItem label="Festas e eventos" allowed={false} />);

    expect(screen.getByText("Festas e eventos")).toBeInTheDocument();
    expect(screen.getByText("não permitido")).toBeInTheDocument();
  });
});
