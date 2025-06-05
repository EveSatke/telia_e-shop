import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileSortButton from "./MobileSortButton";
import { sortOptions } from "../constants";

// Mock the Image component from Next.js
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock sortOptions if it's not available in the test environment
jest.mock("../constants", () => ({
  sortOptions: [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ],
}));

describe("MobileSortButton", () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  it("renders with the current sort option", () => {
    render(
      <MobileSortButton currentSort="newest" onSortChange={mockOnSortChange} />
    );
    // Change this line
    const element = screen.getByText("Newest", { selector: "span" });
    expect(element).toBeInTheDocument();
  });

  it("renders all sort options in the select element", () => {
    render(
      <MobileSortButton currentSort="newest" onSortChange={mockOnSortChange} />
    );
    const selectElement = screen.getByLabelText("Sort by");
    sortOptions.forEach((option) => {
      // Change this line
      const optionElement = screen.getByText(option.label, {
        selector: "option",
      });
      expect(optionElement).toBeInTheDocument();
    });
  });

  it("calls onSortChange when a new option is selected", () => {
    render(
      <MobileSortButton currentSort="newest" onSortChange={mockOnSortChange} />
    );
    const selectElement = screen.getByLabelText("Sort by") as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: "oldest" } });
    expect(mockOnSortChange).toHaveBeenCalledWith("oldest");
  });

  it("applies custom className when provided", () => {
    render(
      <MobileSortButton
        currentSort="newest"
        onSortChange={mockOnSortChange}
        className="custom-class"
      />
    );
    const containerElement = screen.getByLabelText("Sort by").closest("div");
    expect(containerElement).toHaveClass("custom-class");
  });

  it("changes style when select is opened", () => {
    render(
      <MobileSortButton currentSort="newest" onSortChange={mockOnSortChange} />
    );
    const selectElement = screen.getByLabelText("Sort by");
    const containerElement =
      selectElement.previousElementSibling as HTMLElement;

    // Open the select
    fireEvent.focus(selectElement);

    // Check if the background color class changed
    expect(containerElement).toHaveClass("bg-focus-purple");
    expect(containerElement).not.toHaveClass("bg-white");

    // Close the select
    fireEvent.blur(selectElement);

    // Check if it returned to the initial state
    expect(containerElement).toHaveClass("bg-white");
    expect(containerElement).not.toHaveClass("bg-focus-purple");
  });
});
