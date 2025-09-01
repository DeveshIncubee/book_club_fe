import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../components/ui/header";

jest.mock("next/link", () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

describe("Header", () => {
  it("renders a link for /", () => {
    render(<Header />);

    const link = screen.getByRole("link", { name: /book club/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders a link for /books", () => {
    render(<Header />);

    const link = screen.getByRole("link", { name: /books/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/books");
  });

  it("renders a link for /events", () => {
    render(<Header />);

    const link = screen.getByRole("link", { name: /events/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/events");
  });
});
