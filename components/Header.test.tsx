import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Header", () => {
  it("renders the logo with correct attributes", () => {
    render(<Header />);

    const logo = screen.getByRole("img", { name: /e-shop logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logo.png");
    expect(logo).toHaveAttribute("width", "98");
    expect(logo).toHaveAttribute("height", "32");
  });

  it("renders a link to the home page", () => {
    render(<Header />);

    const homeLink = screen.getByRole("link", { name: /e-shop home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("applies correct CSS classes", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "w-full bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.1)]"
    );

    const wrapper = header.firstElementChild;
    expect(wrapper).toHaveClass("wrapper flex items-center justify-between");
  });
});
