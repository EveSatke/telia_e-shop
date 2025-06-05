import Image from "next/image";

interface Filters {
  sort: string;
  types: string[];
  brands: string[];
  priceRanges: string[];
  colors: string[];
  inStock: string[];
}

interface MobileFilterButtonProps {
  onClick: () => void;
  className?: string;
  filters: Filters;
}

const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({
  onClick,
  className = "",
  filters,
}) => {
  const getActiveFiltersCount = () => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === "sort") return count; // Don't count sort as a filter
      return count + (Array.isArray(value) ? value.length : 0);
    }, 0);
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <button
      onClick={onClick}
      className={`text-purple border border-purple font-medium bg-white text-base rounded-full transition-colors flex items-center ${className}`}
      aria-label={`Filter by${
        activeFiltersCount > 0 ? ` (${activeFiltersCount} active filters)` : ""
      }`}
    >
      <Image
        src="/images/filter.svg"
        alt=""
        width={16}
        height={16}
        className="mr-2"
        role="img"
        aria-hidden="true"
      />
      <span>
        Filter by{activeFiltersCount > 0 && ` (${activeFiltersCount})`}
      </span>
    </button>
  );
};

export default MobileFilterButton;
