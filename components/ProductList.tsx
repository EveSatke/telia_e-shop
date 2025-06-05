import ProductCard from "./ProductCard";
import { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onOrderNow: (product: Product) => void;
}

const ProductList = ({ products, onOrderNow }: ProductListProps) => {
  if (products.length === 0) {
    return <p aria-live="polite">No products are currently available.</p>;
  }

  return (
    // Add a semantic list structure and ARIA label
    <ul
      className="flex flex-wrap gap-6 justify-center sm:mx-12 md:mx-6 sm:justify-start"
      aria-label="Product list"
    >
      {products.map((product) => (
        <li key={product.id} className="w-auto">
          <ProductCard product={product} onOrderNow={onOrderNow} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
