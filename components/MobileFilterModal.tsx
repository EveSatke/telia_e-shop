import React, { useState, useEffect } from "react";
import FilterSidebar from "./FilterSidebar";

interface Filters {
  sort: string;
  types: string[];
  brands: string[];
  priceRanges: string[];
  colors: string[];
  inStock: string[];
}

interface MobileFilterModalProps {
  filters: Filters;
  onFilterChange: (filterType: string, selectedValues: string[]) => void;
  onClose: () => void;
  onApplyFilters: () => void;
}

const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  filters,
  onFilterChange,
  onClose,
  onApplyFilters,
}) => {
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  // Update tempFilters when the filters prop changes
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleFilterChange = (
    filterType: keyof Filters,
    selectedValues: string | string[]
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterType]: selectedValues,
    }));
  };

  const handleApplyFilters = () => {
    Object.entries(tempFilters).forEach(([key, value]) => {
      onFilterChange(key, Array.isArray(value) ? value : [value]);
    });
    onApplyFilters();
    onClose();
  };

  const getActiveFiltersCount = () => {
    return Object.values(tempFilters).reduce((count, value) => {
      return count + (Array.isArray(value) ? value.length : 0);
    }, 0);
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-heading"
    >
      <div className="bg-white p-4 flex-grow overflow-y-auto">
        <h2
          id="filter-heading"
          className="text-[28px] leading-9 font-bold my-6"
        >
          Filter By
        </h2>
        <FilterSidebar
          onSortChange={(value) => handleFilterChange("sort", value)}
          onTypeChange={(values) => handleFilterChange("types", values)}
          onBrandChange={(values) => handleFilterChange("brands", values)}
          onPriceChange={(values) => handleFilterChange("priceRanges", values)}
          onColorChange={(values) => handleFilterChange("colors", values)}
          onStockChange={(values) => handleFilterChange("inStock", values)}
          initialSort={tempFilters.sort}
          initialTypes={tempFilters.types}
          initialBrands={tempFilters.brands}
          initialPriceRanges={tempFilters.priceRanges}
          initialColors={tempFilters.colors}
          initialInStock={tempFilters.inStock}
        />
      </div>
      <div className="bg-secondary p-4 flex justify-evenly">
        <button
          onClick={onClose}
          className="border border-dark-purple font-medium	text-base text-dark-purple py-4 rounded-full hover:bg-purple-700 transition-colors flex items-center leading-4 min-w-40 justify-center sm:w-6/12 mr-4"
          aria-label="Close filters"
        >
          Close
        </button>
        <button
          onClick={handleApplyFilters}
          className="bg-dark-purple font-medium	text-base text-white py-4 rounded-full hover:bg-purple-700 transition-colors flex items-center leading-4 min-w-40 justify-center sm:w-6/12"
          aria-label={`Apply filters${
            activeFiltersCount > 0 ? ` (${activeFiltersCount} active)` : ""
          }`}
        >
          See Results {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>
      </div>
    </div>
  );
};

export default MobileFilterModal;
