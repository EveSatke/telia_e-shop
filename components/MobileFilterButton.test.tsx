import { render, screen, fireEvent } from "@testing-library/react";
import MobileFilterButton from "./MobileFilterButton";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("MobileFilterButton", () => {
  const mockOnClick = jest.fn();
  const defaultFilters = {
    sort: "",
    types: [],
    brands: [],
    priceRanges: [],
    colors: [],
    inStock: [],
  };

  it("renders correctly with no active filters", () => {
    render(
      <MobileFilterButton onClick={mockOnClick} filters={defaultFilters} />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Filter by");
    expect(screen.getByAltText("")).toBeInTheDocument();
  });

  it("displays the correct number of active filters", () => {
    const filtersWithActive = {
      ...defaultFilters,
      types: ["Type1", "Type2"],
      brands: ["Brand1"],
    };

    render(
      <MobileFilterButton onClick={mockOnClick} filters={filtersWithActive} />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Filter by (3)");
  });

  it("calls onClick when button is clicked", () => {
    render(
      <MobileFilterButton onClick={mockOnClick} filters={defaultFilters} />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(
      <MobileFilterButton
        onClick={mockOnClick}
        filters={defaultFilters}
        className="custom-class"
      />
    );

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("has correct aria-label with no active filters", () => {
    render(
      <MobileFilterButton onClick={mockOnClick} filters={defaultFilters} />
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Filter by"
    );
  });

  it("has correct aria-label with active filters", () => {
    const filtersWithActive = {
      ...defaultFilters,
      types: ["Type1"],
    };

    render(
      <MobileFilterButton onClick={mockOnClick} filters={filtersWithActive} />
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Filter by (1 active filters)"
    );
  });
});
