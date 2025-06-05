import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { Product } from "../types/index";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("ProductCard", () => {
  const mockProduct: Product = {
    id: "1",
    type: "mobile_phones",
    name: "Test Product",
    brand: "Test Brand",
    image: "/test-image.jpg",
    colorOptions: [
      { color: "Red", hex: "#FF0000" },
      { color: "Blue", hex: "#0000FF" },
    ],
    price: 9.99,
    stockAvailability: 5,
    popularity: 100,
    description: "This is a test product description.",
  };

  const mockOnOrderNow = jest.fn();

  beforeEach(() => {
    render(<ProductCard product={mockProduct} onOrderNow={mockOnOrderNow} />);
  });

  it("renders product information correctly", () => {
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByText("9.99 €/month")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test product description.")
    ).toBeInTheDocument();
  });

  it("displays color options", () => {
    const colorOptions = screen.getAllByRole("img", { name: /Red|Blue/ });
    expect(colorOptions).toHaveLength(2);
  });

  it("shows in stock message when stock is available", () => {
    expect(screen.getByText("In stock")).toBeInTheDocument();
  });

  it('calls onOrderNow when "Order now" button is clicked', () => {
    fireEvent.click(screen.getByRole("button", { name: /Order now/i }));
    expect(mockOnOrderNow).toHaveBeenCalledWith(mockProduct);
  });

  it("shows out of stock message when stock is not available", () => {
    const outOfStockProduct = { ...mockProduct, stockAvailability: 0 };
    render(
      <ProductCard product={outOfStockProduct} onOrderNow={mockOnOrderNow} />
    );
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });
});
