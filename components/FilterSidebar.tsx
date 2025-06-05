import React from "react";
import {
  sortOptions,
  typeOptions,
  brandOptions,
  priceOptions,
  colorOptions,
  stockOptions,
} from "@/constants/index";
import FilterOptions from "./FilterOptions";

interface FilterSidebarProps {
  onSortChange: (selectedValues: string[]) => void;
  onTypeChange: (selectedValues: string[]) => void;
  onBrandChange: (selectedValues: string[]) => void;
  onPriceChange: (selectedValues: string[]) => void;
  onColorChange: (selectedValues: string[]) => void;
  onStockChange: (selectedValues: string[]) => void;
  initialSort: string;
  initialTypes: string[];
  initialBrands: string[];
  initialPriceRanges: string[];
  initialColors: string[];
  initialInStock: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onSortChange,
  onTypeChange,
  onBrandChange,
  onPriceChange,
  onColorChange,
  onStockChange,
  initialSort,
  initialTypes,
  initialBrands,
  initialPriceRanges,
  initialColors,
  initialInStock,
}) => {
  return (
    <aside className="lg:w-64 lg:mx-12" aria-label="Product filters">
      <h2 id="filter-heading" className="sr-only">
        Product filters
      </h2>
      <div className="hidden lg:block">
        <FilterOptions
          title="Sort By"
          options={sortOptions}
          type="radio"
          name="sort"
          onFilterChange={onSortChange}
          initialValue={initialSort}
        />
      </div>

      <nav aria-labelledby="filter-heading">
        <FilterOptions
          title="Type"
          options={typeOptions}
          type="checkbox"
          onFilterChange={onTypeChange}
          initialValue={initialTypes}
        />
        <FilterOptions
          title="Brand"
          options={brandOptions}
          type="checkbox"
          onFilterChange={onBrandChange}
          initialValue={initialBrands}
        />
        <FilterOptions
          title="Price Range"
          options={priceOptions}
          type="checkbox"
          onFilterChange={onPriceChange}
          initialValue={initialPriceRanges}
        />
        <FilterOptions
          title="Color"
          options={colorOptions}
          type="checkbox"
          onFilterChange={onColorChange}
          initialValue={initialColors}
        />
        <FilterOptions
          title="Stock"
          options={stockOptions}
          type="checkbox"
          onFilterChange={onStockChange}
          initialValue={initialInStock}
        />
      </nav>
    </aside>
  );
};

export default FilterSidebar;
