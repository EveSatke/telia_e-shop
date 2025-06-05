"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product, FormData } from "../types/index";
import FilterSidebar from "./FilterSidebar";
import ProductList from "./ProductList";
import MobileFilterButton from "./MobileFilterButton";
import MobileSortButton from "./MobileSortButton";
import MobileFilterModal from "./MobileFilterModal";
import OrderForm from "./OrderForm";
import { useId } from "react";

interface ProductCatalogProps {
  products: Product[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    sort: "most_popular",
    types: [] as string[],
    brands: [] as string[],
    priceRanges: [] as string[],
    colors: [] as string[],
    inStock: [] as string[],
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductInStock, setIsProductInStock] = useState(false);

  const applyFilters = useCallback(() => {
    let result = [...products];

    if (filters.types.length > 0) {
      result = result.filter((product) => filters.types.includes(product.type));
    }

    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    if (filters.priceRanges.length > 0) {
      result = result.filter((product) => {
        return filters.priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && product.price <= max;
        });
      });
    }

    if (filters.colors.length > 0) {
      result = result.filter((product) =>
        product.colorOptions.some((color) =>
          filters.colors.includes(color.color)
        )
      );
    }
    if (filters.inStock.length > 0) {
      result = result.filter((product) => {
        const inStockSelected = filters.inStock.includes("in_stock");
        const outOfStockSelected = filters.inStock.includes("out_of_stock");

        if (inStockSelected && outOfStockSelected) {
          return true;
        } else if (inStockSelected) {
          return product.stockAvailability > 0;
        } else if (outOfStockSelected) {
          return product.stockAvailability === 0;
        }
        return true;
      });
    }

    result.sort((a, b) => {
      switch (filters.sort) {
        case "price_desc":
          return b.price - a.price;
        case "price_asc":
          return a.price - b.price;
        case "most_popular":
        default:
          return b.popularity - a.popularity;
      }
    });

    setFilteredProducts(result);
  }, [filters, products]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = useCallback(
    (filterType: keyof typeof filters, selectedValues: string[]) => {
      setFilters((prev) => {
        const newFilters = { ...prev };
        if (filterType === "sort") {
          newFilters[filterType] = selectedValues[0] as string;
        } else if (filterType === "inStock") {
          newFilters[filterType] = selectedValues;
        } else {
          newFilters[filterType] = selectedValues;
        }
        return newFilters;
      });
    },
    []
  );

  const handleFilterChangeWrapper = (
    filterType: string,
    selectedValues: string[]
  ) => {
    handleFilterChange(filterType as keyof typeof filters, selectedValues);
  };

  const isPriceSort =
    filters.sort === "price_asc" || filters.sort === "price_desc";

  const handleOrderNow = (product: Product) => {
    setSelectedProduct(product);
    setIsProductInStock(product.stockAvailability > 0);
    setIsOrderFormOpen(true);
  };

  const handleCloseOrderForm = () => {
    setIsOrderFormOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmitOrder = async (formData: FormData): Promise<boolean> => {
    try {
      console.log("Order submitted for product:", selectedProduct?.name);
      console.log("Form data:", formData);

      // Here you would typically send the order data to your backend
      // For example:
      // const response = await fetch('/api/submit-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ product: selectedProduct, formData })
      // });
      // if (!response.ok) throw new Error('Failed to submit order');
      // throw new Error("Simulated backend error");
      // If the submission is successful:
      setSelectedProduct(null);
      return true;
    } catch (error) {
      console.error("Error submitting order:", error);
      return false;
    }
  };

  const filterId = useId();
  const sortId = useId();

  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className={`flex mb-6 items-center justify-center sm:justify-start  sm:mx-12 md:flex-row md:items-end md:mx-6 lg:hidden  ${
          isPriceSort
            ? "flex-col space-y-2  w-full content-center sm:items-start"
            : "flex-row space-x-4 w-full"
        }`}
        role="toolbar"
        aria-label="Product filtering and sorting options"
      >
        <MobileFilterButton
          onClick={() => setIsMobileFilterOpen(true)}
          className={isPriceSort ? "w-card justify-center py-2" : "px-10 py-2"}
          filters={filters}
          aria-controls={filterId}
          aria-expanded={isMobileFilterOpen}
        />
        <MobileSortButton
          currentSort={filters.sort}
          onSortChange={(value) => handleFilterChange("sort", [value])}
          className={isPriceSort ? "w-card md:ml-4" : " w-40"}
          aria-controls={sortId}
        />
      </div>
      <div className="hidden lg:block flex-shrink-0" id={filterId}>
        <FilterSidebar
          onSortChange={(values) => handleFilterChange("sort", values)}
          onTypeChange={(values) => handleFilterChange("types", values)}
          onBrandChange={(values) => handleFilterChange("brands", values)}
          onPriceChange={(values) => handleFilterChange("priceRanges", values)}
          onColorChange={(values) => handleFilterChange("colors", values)}
          onStockChange={(values) => handleFilterChange("inStock", values)}
          initialSort={filters.sort}
          initialTypes={filters.types}
          initialBrands={filters.brands}
          initialPriceRanges={filters.priceRanges}
          initialColors={filters.colors}
          initialInStock={filters.inStock}
          aria-label="Product filters"
        />
      </div>
      <div className="overflow-y-auto mb-24" id={sortId}>
        <ProductList
          products={filteredProducts}
          onOrderNow={handleOrderNow}
          aria-live="polite"
          aria-relevant="additions removals"
        />
      </div>
      {isMobileFilterOpen && (
        <MobileFilterModal
          filters={filters}
          onFilterChange={handleFilterChangeWrapper}
          onClose={() => setIsMobileFilterOpen(false)}
          onApplyFilters={applyFilters}
          aria-label="Mobile filter options"
        />
      )}
      {isOrderFormOpen && (
        <OrderForm
          isOpen={isOrderFormOpen}
          onClose={handleCloseOrderForm}
          onSubmit={handleSubmitOrder}
          productAvailable={isProductInStock}
          aria-label="Order form"
        />
      )}
    </div>
  );
};

export default ProductCatalog;
