import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Divider from "../index";

const renderDivider = (props = {}) => render(<Divider {...props} />)

describe("<Divider />", () => {
  it("renders default text", () => {
    renderDivider();
    expect(screen.getByText("Or continue with")).toBeInTheDocument();
  })

  it("renders custom text when provided", () => {
    renderDivider({ text: "Custom divider" });
    expect(screen.getByText("Custom divider")).toBeInTheDocument();
  })

  it("applies custom className to the base container", () => {
    const { container } = renderDivider({ className: "my-extra-class" });
    expect(container.firstChild).toHaveClass("my-extra-class");
  })

  it("renders exactly two horizontal line elements", () => {
    const { container } = renderDivider();
    const lines = Array.from(container.firstChild!.childNodes).filter(
      (node) => node.nodeName === "DIV"
    );
    expect(lines).toHaveLength(2);
  })
})
