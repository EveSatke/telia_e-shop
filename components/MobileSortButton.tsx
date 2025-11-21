import Image from "next/image";
import { useState } from "react";
import { sortOptions } from "../constants";

interface MobileSortButtonProps {
  currentSort: string;
  onSortChange: (value: string) => void;
  className?: string;
}

const MobileSortButton: React.FC<MobileSortButtonProps> = ({
  currentSort,
  onSortChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="sort-select" className="sr-only">
        Sort by
      </label>
      <div
        className={`flex items-center justify-center py-2 px-4 text-purple border border-purple font-medium text-base rounded-full transition-colors ${
          isOpen ? "bg-focus-purple" : "bg-white"
        }`}
      >
        <Image
          src="/images/sort.svg"
          alt=""
          width={16}
          height={16}
          className="mr-2"
          aria-hidden="true"
        />
        <span>
          {sortOptions.find((option) => option.value === currentSort)?.label ||
            currentSort}
        </span>
      </div>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleSelectChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Sort by"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MobileSortButton;
