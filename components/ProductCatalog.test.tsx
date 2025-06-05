import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCatalog from "./ProductCatalog";
import { Product } from "../types/index";

// Mock child components
jest.mock("./FilterSidebar", () => () => <div data-testid="filter-sidebar" />);
jest.mock("./ProductList", () => ({ products }: { products: Product[] }) => (
  <div data-testid="product-list">
    {products.map((p) => (
      <div key={p.id}>{p.name}</div>
    ))}
  </div>
));
jest.mock(
  "./MobileFilterButton",
  () =>
    ({ onClick }: { onClick: () => void }) =>
      (
        <button data-testid="mobile-filter-button" onClick={onClick}>
          Filter
        </button>
      )
);
jest.mock(
  "./MobileSortButton",
  () =>
    ({ onSortChange }: { onSortChange: (value: string) => void }) =>
      (
        <select
          data-testid="mobile-sort-button"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="most_popular">Most Popular</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      )
);
jest.mock(
  "./MobileFilterModal",
  () =>
    ({ onClose }: { onClose: () => void }) =>
      (
        <div data-testid="mobile-filter-modal">
          <button onClick={onClose}>Close</button>
        </div>
      )
);
jest.mock("./OrderForm", () => ({ onClose }: { onClose: () => void }) => (
  <div data-testid="order-form">
    <button onClick={onClose}>Close</button>
  </div>
));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 10,
    description: "Description 1",
    type: "Type1",
    brand: "Brand1",
    image: "image1.jpg",
    colorOptions: [{ color: "Red", hex: "#AA4A44" }],
    stockAvailability: 10,
    popularity: 100,
  },
  {
    id: "2",
    name: "Product 2",
    price: 20,
    description: "Description 2",
    type: "Type2",
    brand: "Brand2",
    image: "image2.jpg",
    colorOptions: [{ color: "Green", hex: "#008000" }],
    stockAvailability: 20,
    popularity: 200,
  },
];

describe("ProductCatalog", () => {
  it("renders without crashing", () => {
    render(<ProductCatalog products={mockProducts} />);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  it("displays all products initially", () => {
    render(<ProductCatalog products={mockProducts} />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("opens mobile filter modal when filter button is clicked", () => {
    render(<ProductCatalog products={mockProducts} />);
    fireEvent.click(screen.getByTestId("mobile-filter-button"));
    expect(screen.getByTestId("mobile-filter-modal")).toBeInTheDocument();
  });

  it("closes mobile filter modal", () => {
    render(<ProductCatalog products={mockProducts} />);
    fireEvent.click(screen.getByTestId("mobile-filter-button"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("mobile-filter-modal")).not.toBeInTheDocument();
  });

  it("changes sort order", async () => {
    render(<ProductCatalog products={mockProducts} />);
    fireEvent.change(screen.getByTestId("mobile-sort-button"), {
      target: { value: "price_desc" },
    });
    await waitFor(() => {
      const productElements = screen.getAllByText(/Product \d/);
      expect(productElements[0]).toHaveTextContent("Product 2");
      expect(productElements[1]).toHaveTextContent("Product 1");
    });
  });

  // Add more tests here for other functionalities like filtering, opening order form, etc.
});
