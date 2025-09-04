import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import AllBooks from "@/components/ui/all-books";
import { Provider } from "@/components/ui/provider";
import { ALL_BOOKS } from "@/lib/queries";

// Mock GraphQL response
const mocks = [
  {
    request: {
      query: ALL_BOOKS,
    },
    result: {
      data: {
        books: [
          {
            id: "1",
            title: "No Thoughts",
            author: "Anon",
            genre: "Humor",
            publishedYear: 1964,
            __typename: "Book",
          },
          {
            id: "2",
            title: "Jesting Pilate",
            author: "Kena Rau MD",
            genre: "Narrative nonfiction",
            publishedYear: 1937,
            __typename: "Book",
          },
          {
            id: "3",
            title: "In Death Ground",
            author: "Cesar Smith",
            genre: "Legend",
            publishedYear: 1972,
            __typename: "Book",
          },
          {
            id: "4",
            title: "Frequent Hearses",
            author: "Graig Brekke",
            genre: "Fiction narrative",
            publishedYear: 1998,
            __typename: "Book",
          },
        ],
      },
    },
  },
];

const loadingMocks = [
  {
    request: {
      query: ALL_BOOKS,
    },
    result: {
      data: {
        books: [],
      },
    },
  },
];

const renderWithProviders = (ui, mocks) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>,
    { wrapper: Provider },
  );

describe("AllBooks", () => {
  it("renders BookSkeleton while loading", () => {
    renderWithProviders(<AllBooks />, loadingMocks);

    const firstSkeleton = screen.getByTestId("book-skeleton-1");
    const secondSkeleton = screen.getByTestId("book-skeleton-2");
    const thirdSkeleton = screen.getByTestId("book-skeleton-3");
    const fourthSkeleton = screen.getByTestId("book-skeleton-4");

    expect(firstSkeleton).toBeInTheDocument();
    expect(secondSkeleton).toBeInTheDocument();
    expect(thirdSkeleton).toBeInTheDocument();
    expect(fourthSkeleton).toBeInTheDocument();
  });
});

describe("AllBooks", () => {
  it("renders Book after successful data fetch", async () => {
    renderWithProviders(<AllBooks />, mocks);

    await waitFor(() => {
      const firstBook = screen.getByTestId("book-1");
      expect(firstBook).toBeInTheDocument();

      const secondBook = screen.getByTestId("book-2");
      expect(secondBook).toBeInTheDocument();

      const thirdBook = screen.getByTestId("book-3");
      expect(thirdBook).toBeInTheDocument();

      const fourthBook = screen.getByTestId("book-4");
      expect(fourthBook).toBeInTheDocument();
    });
  });
});
