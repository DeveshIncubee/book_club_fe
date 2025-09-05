import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import BookReviews from "@/components/ui/book-reviews";
import { Provider } from "@/components/ui/provider";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { CURRENT_USER } from "@/lib/queries";

// Mock GraphQL response
const mocks = [
  {
    request: {
      query: CURRENT_USER,
    },
    result: {
      data: {
        users: [
          {
            id: "3",
            name: "Alice",
          },
        ],
      },
    },
  },
];

const johnMocks = [
  {
    request: {
      query: CURRENT_USER,
    },
    result: {
      data: {
        users: [
          {
            id: "1",
            name: "John Doe",
          },
        ],
      },
    },
  },
];

const mockReviews = [
  {
    id: "1",
    rating: 5,
    comment: "Great book!",
    user: { id: "1", name: "John Doe" },
  },
  {
    id: "2",
    rating: 4,
    comment: "Good read.",
    user: { id: "2", name: "Jane Doe" },
  },
];

const renderWithProviders = (mocks, uiMocks) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CurrentUserProvider>
        <BookReviews reviews={uiMocks} />
      </CurrentUserProvider>
    </MockedProvider>,
    { wrapper: Provider },
  );

describe("BookReviews", () => {
  it("renders skeleton when loading", () => {
    renderWithProviders(mocks, []);

    const skeleton = screen.getByTestId("my-review-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders null when there are no reviews", async () => {
    renderWithProviders(mocks, []);

    await waitFor(() => {
      expect(
        screen.queryByText("Other Users' Reviews"),
      ).not.toBeInTheDocument();
    });
  });

  it("renders reviews", async () => {
    renderWithProviders(mocks, mockReviews);

    await waitFor(() => {
      expect(screen.getByText("Other Users' Reviews")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Great book!")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("Good read.")).toBeInTheDocument();
    });
  });

  it("does not render the current user's review", async () => {
    renderWithProviders(johnMocks, mockReviews);

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });
});
