import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AllResourcesHeading from "@/components/ui/all-resources-heading";
import { Provider } from "@/components/ui/provider";

describe("AllResourcesHeading", () => {
  it("renders the paragraph with the correct text for books section", () => {
    render(<AllResourcesHeading resourceType="book" />, { wrapper: Provider });

    const text = screen.getByText(/all books/i);
    expect(text).toBeInTheDocument();
  });

  it("renders the paragraph with the correct text for events section", () => {
    render(<AllResourcesHeading resourceType="event" />, { wrapper: Provider });

    const text = screen.getByText(/all events/i);
    expect(text).toBeInTheDocument();
  });

  it("renders a link for /books", () => {
    render(<AllResourcesHeading resourceType="book" />, { wrapper: Provider });

    const link = screen.getByRole("link", { name: /add book/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/books/new");
  });

  it("renders a link for /events", () => {
    render(<AllResourcesHeading resourceType="event" />, { wrapper: Provider });

    const link = screen.getByRole("link", { name: /add event/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/events/new");
  });
});
