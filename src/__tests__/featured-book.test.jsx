import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeaturedBook from "@/components/ui/featured-book";
import { Provider } from "@/components/ui/provider";

describe("FeaturedBook", () => {
  it("renders contents of the book", () => {
    const book = {
      id: "1",
      title: "No Thoughts",
      author: "Anon",
      genre: "Humor",
      publishedYear: 1964,
      __typename: "Book",
    };

    render(<FeaturedBook book={book} />, { wrapper: Provider });

    const title = screen.getByText(/no thoughts/i);
    expect(title).toBeInTheDocument();

    const author = screen.getByText(/anon/i);
    expect(author).toBeInTheDocument();

    const genre = screen.getByText(/humor/i);
    expect(genre).toBeInTheDocument();

    const year = screen.getByText(/1964/i);
    expect(year).toBeInTheDocument();
  });

  it("renders contents of the book but with missing genre and publishedYear", () => {
    const book = {
      id: "1",
      title: "No Thoughts",
      author: "Anon",
      __typename: "Book",
    };

    render(<FeaturedBook book={book} />, { wrapper: Provider });

    const title = screen.getByText(/no thoughts/i);
    expect(title).toBeInTheDocument();

    const author = screen.getByText(/anon/i);
    expect(author).toBeInTheDocument();

    const genre = screen.queryByText(/humor/i);
    expect(genre).toBeNull();

    const year = screen.queryByText(/1964/i);
    expect(year).toBeNull();
  });
});
