import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddBookPage from "@/app/books/new/page";
import { Provider } from "@/components/ui/provider";

// Mock the BookForm component since it's tested separately
jest.mock("@/components/ui/book-form", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="book-form" />;
    },
  };
});

const renderWithProviders = (ui) => {
  return render(ui, { wrapper: Provider });
};

describe("AddBookPage", () => {
  it("renders the main heading", () => {
    renderWithProviders(<AddBookPage />);

    const heading = screen.getByRole("heading", {
      name: /add book/i,
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders the BookForm component", () => {
    renderWithProviders(<AddBookPage />);

    const bookForm = screen.getByTestId("book-form");
    expect(bookForm).toBeInTheDocument();
  });
});
