import HeroBanner from "@/components/HeroBanner";
import { Product } from "@/types/index";
import ProductCatalog from "@/components/ProductCatalog";

import { promises as fs } from "fs";
import path from "path";

async function getData(): Promise<Product[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json"
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    if (!data.products || !Array.isArray(data.products)) {
      console.error("Data does not contain a products array:", data);
      return [];
    }

    return data.products;
  } catch (error) {
    console.error("Failed to read data:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return [];
  }
}

export default async function Home() {
  const products: Product[] = await getData();

  return (
    <main className="min-h-screen">
      <h1 className="sr-only">Welcome to our Product Catalog</h1>
      <HeroBanner />
      <ProductCatalog products={products} />
    </main>
  );
}
