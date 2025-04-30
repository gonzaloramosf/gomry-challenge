import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, expect } from "vitest";
import Button from "../index";

const getBtn = (name = /./i) => screen.getByRole("button", { name });

describe('<Button />', () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(getBtn(/click me/i)).toBeInTheDocument();
  })

  it("is disabled and faded when `disabled` is true", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = getBtn(/disabled/i);
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("opacity-50");
  })

  it("shows a spinner and hides label while `isLoading`", () => {
    render(<Button isLoading>Save</Button>);
    const btn = screen.getByRole("button");
    expect(btn.querySelector('svg')).toBeTruthy();
    expect(btn).toBeDisabled();
    expect(btn).not.toHaveTextContent(/save/i);
  })

  it("places a right icon correctly", () => {
    const icon = <svg data-testid="icon" />;
    render(<Button rightIcon={icon}>Icon right</Button>);
    const iconWrapper = screen.getByTestId("icon").parentElement;
    expect(iconWrapper).toHaveClass("ml-2");
  })

  it("responds to click events", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    await userEvent.click(getBtn(/tap/i));
    expect(onClick).toHaveBeenCalledTimes(1);
  })
})
