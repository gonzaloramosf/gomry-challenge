import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DatePicker from "../index";


describe("<DatePicker />", () => {
  it("shows label text when provided", () => {
    render(<DatePicker label="Birth date" />);
    expect(screen.getByText("Birth date")).toBeInTheDocument();
  })

  it("renders error message and keeps it in the DOM", () => {
    render(<DatePicker errorMessage="Invalid date" />);
    expect(screen.getByText("Invalid date")).toBeInTheDocument();
  })

  it("renders the calendar SVG icon", () => {
    render(<DatePicker />);
    const icon = document.querySelector("svg.lucide-calendar");
    expect(icon).not.toBeNull();
  })
})