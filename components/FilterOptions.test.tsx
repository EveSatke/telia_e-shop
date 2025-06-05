import { render, screen, fireEvent } from "@testing-library/react";
import FilterOptions from "./FilterOptions";

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("FilterOptions", () => {
  const mockOnFilterChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders checkbox filter options correctly", () => {
    render(
      <FilterOptions
        title="Test Checkbox Filter"
        options={mockOptions}
        type="checkbox"
        onFilterChange={() => {}}
        initialValue={[]}
      />
    );

    const fieldset = screen.getByRole("group", {
      name: "Test Checkbox Filter",
    });
    expect(fieldset).toBeInTheDocument();
    expect(fieldset.tagName).toBe("FIELDSET");

    // Check for the presence of checkbox options
    mockOptions.forEach((option) => {
      const checkbox = screen.getByRole("checkbox", { name: option.label });
      expect(checkbox).toBeInTheDocument();
    });
  });

  test("renders radio filter options correctly", () => {
    render(
      <FilterOptions
        title="Test Radio Filter"
        options={mockOptions}
        type="radio"
        onFilterChange={() => {}}
        initialValue=""
      />
    );

    const fieldset = screen.getByRole("group", {
      name: "Test Radio Filter",
    });
    expect(fieldset).toBeInTheDocument();
    expect(fieldset.tagName).toBe("FIELDSET");

    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).toBeInTheDocument();

    mockOptions.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
      expect(screen.getByLabelText(option.label)).toHaveAttribute(
        "type",
        "radio"
      );
      expect(screen.getByLabelText(option.label)).toHaveAttribute(
        "value",
        option.value
      );
    });
  });

  test("checkbox filter changes trigger onFilterChange", () => {
    render(
      <FilterOptions
        title="Test Checkbox Filter"
        options={mockOptions}
        type="checkbox"
        onFilterChange={mockOnFilterChange}
        initialValue={[]}
      />
    );

    fireEvent.click(screen.getByLabelText("Option 1"));
    expect(mockOnFilterChange).toHaveBeenCalledWith(["option1"]);

    fireEvent.click(screen.getByLabelText("Option 2"));
    expect(mockOnFilterChange).toHaveBeenCalledWith(["option1", "option2"]);

    fireEvent.click(screen.getByLabelText("Option 1"));
    expect(mockOnFilterChange).toHaveBeenCalledWith(["option2"]);
  });

  test("radio filter changes trigger onFilterChange", () => {
    render(
      <FilterOptions
        title="Test Radio Filter"
        options={mockOptions}
        type="radio"
        onFilterChange={mockOnFilterChange}
        initialValue=""
      />
    );

    fireEvent.click(screen.getByLabelText("Option 1"));
    expect(mockOnFilterChange).toHaveBeenCalledWith(["option1"]);

    fireEvent.click(screen.getByLabelText("Option 2"));
    expect(mockOnFilterChange).toHaveBeenCalledWith(["option2"]);
  });

  test("initialValue sets correct checked state", () => {
    render(
      <FilterOptions
        title="Test Checkbox Filter"
        options={mockOptions}
        type="checkbox"
        onFilterChange={mockOnFilterChange}
        initialValue={["option1", "option3"]}
      />
    );

    expect(screen.getByLabelText("Option 1")).toBeChecked();
    expect(screen.getByLabelText("Option 2")).not.toBeChecked();
    expect(screen.getByLabelText("Option 3")).toBeChecked();
  });
});
