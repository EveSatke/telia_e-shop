"use client";

import React, { useState, useEffect, useCallback, useId } from "react";

interface FilterOptionsProps {
  title: string;
  options: { value: string; label: string }[];
  type: "checkbox" | "radio";
  name?: string;
  onFilterChange: (selectedValues: string[]) => void;
  initialValue: string | string[] | number[];
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  title,
  options,
  type,
  name,
  onFilterChange,
  initialValue,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    type === "radio" ? [initialValue as string] : (initialValue as string[])
  );
  const groupId = useId();

  useEffect(() => {
    setSelectedValues(
      type === "radio" ? [initialValue as string] : (initialValue as string[])
    );
  }, [initialValue, type]);

  const handleChange = (value: string) => {
    let newSelectedValues: string[];

    if (type === "checkbox") {
      newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    } else {
      newSelectedValues = [value];
    }

    setSelectedValues(newSelectedValues);
    onFilterChange(newSelectedValues);
  };

  return (
    <fieldset className="mb-10">
      <legend className="font-medium mb-3 leading-5">{title}</legend>
      <div
        role={type === "radio" ? "radiogroup" : undefined}
        aria-labelledby={`${groupId}-title`}
      >
        <span id={`${groupId}-title`} className="sr-only">
          {title}
        </span>
        <ul>
          {options.map((option, index) => {
            const optionId = `${groupId}-option-${index}`;
            return (
              <li key={optionId} className="mb-1">
                <label
                  htmlFor={optionId}
                  className="flex items-center h-11 cursor-pointer"
                >
                  <input
                    id={optionId}
                    type={type}
                    name={name || title}
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleChange(option.value)}
                    className="form-checkbox h-6 w-6 accent-primary transition duration-150 ease-in-out mr-3 flex-shrink-0"
                    aria-describedby={`${optionId}-label`}
                  />
                  <span
                    id={`${optionId}-label`}
                    className="text-gray-700 inline-flex items-baseline h-5"
                  >
                    {option.label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
};

export default FilterOptions;
