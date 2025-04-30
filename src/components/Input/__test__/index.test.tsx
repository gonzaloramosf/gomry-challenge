import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Input from "../index";

const getInput = () => screen.getByRole("textbox");

describe("<Input />", () => {
  it("renders a text input with no label or error by default", () => {
    render(<Input />);
    expect(getInput()).toBeInTheDocument();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  })

  it("renders a label when `label` prop is passed", () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(getInput()).toBeInTheDocument();
  })

  it("calls onChange and updates value when typed into", async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = getInput();

    await userEvent.type(input, "abc");
    expect(input).toHaveValue("abc");
    expect(handleChange).toHaveBeenCalled();
  })

  it("renders an error message and error styling when `errorMessage` is set", () => {
    render(<Input errorMessage="Required field" />);
    const input = getInput();
    expect(input).toHaveClass("border-red-500");
    expect(screen.getByText("Required field")).toBeInTheDocument();
  })

  it("accepts a custom className and appends it", () => {
    render(<Input className="custom-class" />);
    expect(getInput()).toHaveClass("custom-class");
  })

  it("applies size and variant classes correctly", () => {
    render(<Input size="sm" variant="success" />);
    const input = getInput();
    expect(input).toHaveClass("px-2", "py-1", "text-sm");
    expect(input).toHaveClass("border-green-500");
    expect(input).not.toHaveClass("border-gray-300");
  })
})
