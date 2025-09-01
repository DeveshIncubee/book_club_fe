import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeaturedResourcesHeading from "../components/ui/featured-resources-heading";

describe("FeaturedResourcesHeading", () => {
  it("renders the paragraph with the correct text for books section", () => {
    render(<FeaturedResourcesHeading resourceType="book" />);

    const text = screen.getByText(/featured books/i);
    expect(text).toBeInTheDocument();
  });

  it("renders the paragraph with the correct text for events section", () => {
    render(<FeaturedResourcesHeading resourceType="event" />);

    const text = screen.getByText(/featured events/i);
    expect(text).toBeInTheDocument();
  });

  it("renders a link for /books", () => {
    render(<FeaturedResourcesHeading resourceType="book" />);

    const link = screen.getByRole("link", { name: /view all/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/books");
  });

  it("renders a link for /events", () => {
    render(<FeaturedResourcesHeading resourceType="event" />);

    const link = screen.getByRole("link", { name: /view all/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/events");
  });
});
