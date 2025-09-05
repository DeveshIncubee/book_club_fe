import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import { notFound } from "next/navigation";
import BookDetailPage from "@/app/books/[id]/page";
import { Provider } from "@/components/ui/provider";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { query } from "@/lib/client";
import { CURRENT_USER } from "@/lib/queries";

// Mock the query function from lib/client used by the server component
jest.mock("@/lib/client", () => ({
  query: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  __esModule: true,
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

const bookId = "1";

const mockBook = {
  id: bookId,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Fiction",
  publishedYear: 1925,
  reviews: [
    {
      id: "rev-1",
      rating: 5,
      comment: "A classic!",
      user: { id: "user-2", name: "Jane Doe", __typename: "User" },
      __typename: "Review",
    },
  ],
  __typename: "Book",
};

// Mocks for CurrentUserProvider used by child client components
const currentUserMocks = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        users: [{ id: "user-1", name: "John Doe", __typename: "User" }],
      },
    },
  },
];

const renderWithProviders = (ui) => {
  return render(
    <MockedProvider mocks={currentUserMocks} addTypename={false}>
      <CurrentUserProvider>{ui}</CurrentUserProvider>
    </MockedProvider>,
    { wrapper: Provider },
  );
};

describe("BookDetailPage", () => {
  beforeEach(() => {
    query.mockClear();
    notFound.mockClear();
  });

  it("renders book details after successful data fetch", async () => {
    query.mockResolvedValue({ data: { book: mockBook } });

    const Page = await BookDetailPage({ params: { id: bookId } });
    renderWithProviders(Page);

    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText(/f. scott fitzgerald/i)).toBeInTheDocument();
    expect(screen.getByText(/fiction/i)).toBeInTheDocument();
    expect(screen.getByText(/1925/i)).toBeInTheDocument();

    // MyReview will show a form because the current user (John Doe) has not reviewed.
    await waitFor(() => {
      expect(screen.getByText("Leave a Review")).toBeInTheDocument();
    });

    // BookReviews will show other users' reviews
    await waitFor(() => {
      expect(screen.getByText("Other Users' Reviews")).toBeInTheDocument();
      expect(screen.getByText("A classic!")).toBeInTheDocument();
    });
  });

  it("calls notFound on data fetch error", async () => {
    query.mockResolvedValue({ error: new Error("Not found") });

    await expect(BookDetailPage({ params: { id: bookId } })).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );

    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
