import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderForm from "./OrderForm";
import { act } from "react";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("OrderForm", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    productAvailable: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form when isOpen is true", () => {
    render(<OrderForm {...defaultProps} />);
    expect(screen.getByText("Finalise Your Order")).toBeInTheDocument();
  });

  test("does not render the form when isOpen is false", () => {
    render(<OrderForm {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Finalise Your Order")).not.toBeInTheDocument();
  });

  test("displays error messages for invalid inputs", async () => {
    render(<OrderForm {...defaultProps} />);

    fireEvent.click(screen.getByText("Place an order"));

    await waitFor(() => {
      expect(screen.getAllByText("Fill in this required field")).toHaveLength(
        3
      );
    });
  });

  test("submits the form with valid data", async () => {
    render(<OrderForm {...defaultProps} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "1234567890" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /place an order/i }));

    // Wait for the success message with a more flexible matcher and longer timeout
    await waitFor(
      () => {
        expect(screen.getByText(/received your order/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    });
  });

  test("displays error message when submission fails", async () => {
    mockOnSubmit.mockRejectedValueOnce(new Error("Submission failed"));

    render(<OrderForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "1234567890" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Place an order"));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Your order hasn't been placed")
      ).toBeInTheDocument();
    });
  });

  test("displays out of stock message when product is not available", () => {
    render(<OrderForm {...defaultProps} productAvailable={false} />);
    expect(screen.getByText("Product is out of stock")).toBeInTheDocument();
  });

  test("closes the form when close button is clicked", () => {
    render(<OrderForm {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
