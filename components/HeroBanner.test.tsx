import { render, screen } from "@testing-library/react";
import HeroBanner from "./HeroBanner";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("HeroBanner", () => {
  it("renders the hero image with correct attributes", () => {
    render(<HeroBanner />);
    const heroImage = screen.getByAltText(
      "Various mobile phones and accessories displayed on a table"
    );
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "/images/hero.jpg");
    expect(heroImage).toHaveAttribute("width", "1440");
    expect(heroImage).toHaveAttribute("height", "400");
  });

  it("renders the correct heading", () => {
    render(<HeroBanner />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Mobile Phones & Accessories");
  });

  it("renders the description text", () => {
    render(<HeroBanner />);
    const description = screen.getByText(
      /Explore our wide range of cutting-edge mobile devices/
    );
    expect(description).toBeInTheDocument();
  });

  it("has correct aria-labelledby attribute", () => {
    render(<HeroBanner />);
    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "hero-title");
  });
});
