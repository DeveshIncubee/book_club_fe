import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import MyReview from "@/components/ui/my-review";
import { Provider } from "@/components/ui/provider";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { CURRENT_USER } from "@/lib/queries";

// GraphQL mocks for a logged-in user
const userMocks = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        users: [{ id: "user-1", name: "Test User" }],
      },
    },
  },
];

// GraphQL mocks for when no user is logged in
const noUserMocks = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        users: [],
      },
    },
  },
];

const mockReviews = [
  {
    id: "rev-1",
    rating: 5,
    comment: "This book was a fantastic read!",
    user: { id: "user-1", name: "Test User" },
  },
  {
    id: "rev-2",
    rating: 3,
    comment: "It was okay.",
    user: { id: "user-2", name: "Jane Doe" },
  },
];

// Helper function to render the component with all necessary providers
const renderWithProviders = (mocks, props) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CurrentUserProvider>
        <MyReview {...props} />
      </CurrentUserProvider>
    </MockedProvider>,
    { wrapper: Provider },
  );

describe("MyReview", () => {
  it("renders a skeleton while loading", () => {
    renderWithProviders(userMocks, { bookId: "1", reviews: [] });
    expect(screen.getByTestId("my-review-skeleton")).toBeInTheDocument();
  });

  it("displays the user's review if one exists", async () => {
    renderWithProviders(userMocks, { bookId: "1", reviews: mockReviews });

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(
        screen.queryByTestId("my-review-skeleton"),
      ).not.toBeInTheDocument();
    });

    expect(screen.getByText("My Review")).toBeInTheDocument();
    expect(
      screen.getByText("This book was a fantastic read!"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("review-form")).not.toBeInTheDocument();
  });

  describe.each([
    ["the user has not left a review", [mockReviews[1]]],
    ["there are no reviews for the book", []],
  ])("when %s", (_, reviews) => {
    it("displays the review form", async () => {
      renderWithProviders(userMocks, { bookId: "1", reviews: reviews });

      await waitFor(() => {
        expect(
          screen.queryByTestId("my-review-skeleton"),
        ).not.toBeInTheDocument();
      });

      expect(screen.getByText("Leave a Review")).toBeInTheDocument();
      expect(screen.getByTestId("review-form")).toBeInTheDocument();
    });
  });

  it("displays the review form even if there is no current user", async () => {
    renderWithProviders(noUserMocks, { bookId: "1", reviews: [] });

    await waitFor(() => {
      expect(
        screen.queryByTestId("my-review-skeleton"),
      ).not.toBeInTheDocument();
    });

    expect(screen.getByText("Leave a Review")).toBeInTheDocument();
    expect(screen.getByTestId("review-form")).toBeInTheDocument();
  });
});
