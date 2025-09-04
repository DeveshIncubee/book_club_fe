import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import FeaturedBooks from "@/components/ui/featured-books";
import { Provider } from "@/components/ui/provider";
import { FEATURED_BOOKS } from "@/lib/queries";

// Mock GraphQL response
const mocks = [
  {
    request: {
      query: FEATURED_BOOKS,
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
      query: FEATURED_BOOKS,
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

describe("FeaturedBooks", () => {
  it("renders FeaturedBookSkeleton while loading", () => {
    renderWithProviders(<FeaturedBooks />, loadingMocks);

    const firstSkeleton = screen.getByTestId("featured-book-skeleton-1");
    const secondSkeleton = screen.getByTestId("featured-book-skeleton-2");
    const thirdSkeleton = screen.getByTestId("featured-book-skeleton-3");
    const fourthSkeleton = screen.getByTestId("featured-book-skeleton-4");

    expect(firstSkeleton).toBeInTheDocument();
    expect(secondSkeleton).toBeInTheDocument();
    expect(thirdSkeleton).toBeInTheDocument();
    expect(fourthSkeleton).toBeInTheDocument();
  });
});

describe("FeaturedBooks", () => {
  it("renders FeaturedBook after successful data fetch", async () => {
    renderWithProviders(<FeaturedBooks />, mocks);

    await waitFor(() => {
      const firstFeaturedBook = screen.getByTestId("featured-book-1");
      expect(firstFeaturedBook).toBeInTheDocument();

      const secondFeaturedBook = screen.getByTestId("featured-book-2");
      expect(secondFeaturedBook).toBeInTheDocument();

      const thirdFeaturedBook = screen.getByTestId("featured-book-3");
      expect(thirdFeaturedBook).toBeInTheDocument();

      const fourthFeaturedBook = screen.getByTestId("featured-book-4");
      expect(fourthFeaturedBook).toBeInTheDocument();
    });
  });
});
