import { render, screen } from "@testing-library/react";
import FilterSidebar from "./FilterSidebar";

jest.mock("./FilterOptions", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div
      data-testid={`mock-filter-options-${title
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      {title}
    </div>
  ),
}));

const mockProps = {
  onSortChange: jest.fn(),
  onTypeChange: jest.fn(),
  onBrandChange: jest.fn(),
  onPriceChange: jest.fn(),
  onColorChange: jest.fn(),
  onStockChange: jest.fn(),
  initialSort: "most_popular",
  initialTypes: ["mobile_phones"],
  initialBrands: ["apple"],
  initialPriceRanges: ["0-100"],
  initialColors: ["black"],
  initialInStock: ["in_stock"],
};

describe("FilterSidebar", () => {
  it("renders without crashing", () => {
    render(<FilterSidebar {...mockProps} />);
    expect(
      screen.getByRole("complementary", { name: "Product filters" })
    ).toBeInTheDocument();
  });

  it("renders all filter sections", () => {
    render(<FilterSidebar {...mockProps} />);
    expect(screen.getByText("Sort By")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Price Range")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("renders FilterOptions components with correct props", () => {
    render(<FilterSidebar {...mockProps} />);

    expect(
      screen.getByTestId("mock-filter-options-sort-by")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-filter-options-type")).toBeInTheDocument();
    expect(screen.getByTestId("mock-filter-options-brand")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-filter-options-price-range")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-filter-options-color")).toBeInTheDocument();
  });

  it("hides Sort By section on mobile and shows on larger screens", () => {
    render(<FilterSidebar {...mockProps} />);
    const sortBySection = screen
      .getByTestId("mock-filter-options-sort-by")
      .closest("div");
    const parentDiv = sortBySection?.parentElement;
    expect(parentDiv).toHaveClass("hidden");
    expect(parentDiv).toHaveClass("lg:block");
  });
});
