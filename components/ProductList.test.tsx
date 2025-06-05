import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { Product } from "../types";

// Mock the ProductCard component
jest.mock("./ProductCard", () => {
  return function MockProductCard({ product }: { product: Product }) {
    return <div data-testid={`product-card-${product.id}`}>{product.name}</div>;
  };
});

describe("ProductList", () => {
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

  const mockOnOrderNow = jest.fn();

  it("renders a list of products", () => {
    render(<ProductList products={mockProducts} onOrderNow={mockOnOrderNow} />);

    expect(screen.getByLabelText("Product list")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
  });

  it("displays a message when no products are available", () => {
    render(<ProductList products={[]} onOrderNow={mockOnOrderNow} />);

    expect(
      screen.getByText("No products are currently available.")
    ).toBeInTheDocument();
  });

  it("renders the correct number of ProductCard components", () => {
    render(<ProductList products={mockProducts} onOrderNow={mockOnOrderNow} />);

    const productCards = screen.getAllByTestId(/^product-card-/);
    expect(productCards).toHaveLength(mockProducts.length);
  });
});
