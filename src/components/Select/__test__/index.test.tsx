import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Select from "../index";

const OPTIONS = [
  { value: "opt1", label: "Option 1", path: "/icon1.png", alt: "Icon1" },
  { value: "opt2", label: "Option 2", path: "/icon2.png", alt: "Icon2" }
]

describe("<Select />", () => {
  it("shows placeholder when no value is selected", () => {
    render(<Select options={OPTIONS} onChange={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Select an option");
  })

  it("renders a label when provided", () => {
    render(<Select label="Choose" options={OPTIONS} onChange={() => {}} />);
    expect(screen.getByText("Choose")).toBeInTheDocument();
  })

  it("toggles the dropdown on button click", async () => {
    render(<Select options={OPTIONS} onChange={() => {}} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.queryByText("Option 1")).toBeNull();
  })

  it("renders all options when open", async () => {
    render(<Select options={OPTIONS} onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  })

  it("displays the selected option label and its icon", () => {
    const { container } = render(
      <Select
        options={OPTIONS}
        onChange={() => {}}
        value="opt1"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Option 1");
    expect(container.querySelector('img[alt="Icon1"]')).not.toBeNull();
  })

  it("shows error message and applies error styles when `errorMessage` is set", () => {
    const { container } = render(
      <Select
        options={OPTIONS}
        onChange={() => {}}
        errorMessage="Something went wrong"
      />
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("border-red-500");
  })
})
