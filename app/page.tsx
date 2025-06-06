import HeroBanner from "@/components/HeroBanner";
import { Product } from "@/types/index";
import ProductCatalog from "@/components/ProductCatalog";
import { products } from "./data";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">Welcome to our Product Catalog</h1>
      <HeroBanner />
      <ProductCatalog products={products} />
    </main>
  );
}
