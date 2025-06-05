import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MobileFilterModal from "./MobileFilterModal";

// Mock the FilterSidebar component
jest.mock("./FilterSidebar", () => {
  return function MockFilterSidebar(props: any) {
    return <div data-testid="filter-sidebar" {...props} />;
  };
});

const mockFilters = {
  sort: "price-low-high",
  types: ["type1", "type2"],
  brands: ["brand1"],
  priceRanges: ["0-100"],
  colors: ["red", "blue"],
  inStock: ["true"],
};

const mockOnFilterChange = jest.fn();
const mockOnClose = jest.fn();
const mockOnApplyFilters = jest.fn();

describe("MobileFilterModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with correct title", () => {
    render(
      <MobileFilterModal
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    expect(screen.getByText("Filter By")).toBeInTheDocument();
  });

  it("renders FilterSidebar with correct props", () => {
    render(
      <MobileFilterModal
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    const filterSidebar = screen.getByTestId("filter-sidebar");
    expect(filterSidebar).toHaveAttribute("initialSort", "price-low-high");
    expect(filterSidebar).toHaveAttribute("initialTypes", "type1,type2");
    expect(filterSidebar).toHaveAttribute("initialBrands", "brand1");
  });

  it("calls onClose when Close button is clicked", () => {
    render(
      <MobileFilterModal
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onFilterChange, onApplyFilters, and onClose when See Results button is clicked", () => {
    render(
      <MobileFilterModal
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    fireEvent.click(screen.getByText(/See Results/));
    expect(mockOnFilterChange).toHaveBeenCalledTimes(6); // Once for each filter type
    expect(mockOnApplyFilters).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("displays the correct number of active filters", () => {
    render(
      <MobileFilterModal
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    const activeFiltersCount = Object.values(mockFilters).reduce(
      (count, value) => count + (Array.isArray(value) ? value.length : 0),
      0
    );

    expect(
      screen.getByText(`See Results (${activeFiltersCount})`)
    ).toBeInTheDocument();
  });
});
