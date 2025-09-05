import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BookForm from "@/components/ui/book-form";
import { Provider } from "@/components/ui/provider";
import { CREATE_BOOK } from "@/lib/queries";

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const successfulMutationMock = {
  request: {
    query: CREATE_BOOK,
    variables: {
      title: "New Book",
      author: "New Author",
      genre: "Fiction",
      publishedYear: 2023,
    },
  },
  result: {
    data: {
      createBook: {
        __typename: "CreateBookPayload",
        errors: [],
        book: {
          __typename: "Book",
          id: "new-book-id",
        },
      },
    },
  },
};

const renderWithProviders = (mocks) =>
  render(
    <MockedProvider mocks={mocks} addTypename>
      <BookForm />
    </MockedProvider>,
    { wrapper: Provider },
  );

describe("BookForm", () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
  });

  it("renders the form with all fields and a submit button", () => {
    renderWithProviders([]);

    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter author")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter genre")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter published year"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("allows the user to fill and submit the form, then redirects", async () => {
    renderWithProviders([successfulMutationMock]);

    fireEvent.change(screen.getByPlaceholderText("Enter title"), {
      target: { value: "New Book" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter author"), {
      target: { value: "New Author" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter genre"), {
      target: { value: "Fiction" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter published year"), {
      target: { value: "2023" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/books/new-book-id");
    });
  });
});
