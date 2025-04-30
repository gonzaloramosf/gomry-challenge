import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CodeInput from "../index";

const getInputs = (): HTMLInputElement[] => screen.getAllByRole("textbox") as HTMLInputElement[]

describe("<CodeInput />", () => {
  it("renders the correct number of input boxes", () => {
    render(<CodeInput length={4} />);
    expect(getInputs()).toHaveLength(4);
  })

  it("uppercases input and calls onChange", async () => {
    const onChange = vi.fn();
    render(<CodeInput onChange={onChange} length={3} />);
    const inputs = getInputs();

    await userEvent.type(inputs[0], "a");
    expect(inputs[0]).toHaveValue("A");
    expect(onChange).toHaveBeenLastCalledWith("A");
  })

  it("auto-focuses the next box on entry", async () => {
    render(<CodeInput length={3} />);
    const inputs = getInputs();

    await userEvent.type(inputs[0], "b");
    expect(inputs[1]).toHaveFocus();
  })

  it("moves focus back on backspace when empty", async () => {
    render(<CodeInput length={3} />);
    const inputs = getInputs();

    inputs[1].focus();
    expect(inputs[1]).toHaveFocus();

    await userEvent.keyboard("{Backspace}");
    expect(inputs[0]).toHaveFocus();
  })

  it("disables all inputs when isLoading is true", () => {
    render(<CodeInput isLoading length={3} />);
    getInputs().forEach((input) => {
      expect(input).toBeDisabled();
      expect(input).toHaveClass("disabled:opacity-50");
    })
  })

  it("handles paste events correctly", () => {
    const onChange = vi.fn();
    render(<CodeInput onChange={onChange} length={4} />);
    const inputs = getInputs();

    fireEvent.paste(inputs[0], {
      clipboardData: {
        getData: () => "wxyz",
      },
    })

    expect(inputs.map(i => i.value)).toEqual(["W", "X", "Y", "Z"]);
    expect(onChange).toHaveBeenCalledWith("WXYZ");
  })
})