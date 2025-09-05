import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import ReviewForm from "@/components/ui/review-form";
import { CREATE_REVIEW } from "@/lib/queries";

const bookId = "1";
const userId = "1";

const successfulMutationMock = {
  request: {
    query: CREATE_REVIEW,
    variables: {
      rating: 4,
      comment: "A great read!",
      userId,
      bookId,
    },
  },
  result: {
    data: {
      createReview: {
        __typename: "CreateReviewPayload",
        review: {
          __typename: "Review",
          id: "rev-1",
          rating: 4,
          comment: "A great read!",
          user: {
            __typename: "User",
            id: userId,
            name: "Test User",
          },
        },
      },
    },
  },
};

// Helper function to render the component with all necessary providers
const renderWithProviders = (mocks, props) =>
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <ReviewForm {...props} />
    </MockedProvider>,
    { wrapper: Provider },
  );

describe("ReviewForm", () => {
  it("renders the form with rating, comment, and submit button", () => {
    const setMyReview = jest.fn();
    renderWithProviders([], { userId, bookId, setMyReview });

    expect(screen.getByTestId("review-form")).toBeInTheDocument();
    // Chakra's RatingGroup renders a group of radio buttons
    expect(screen.getAllByRole("radio").length).toBe(5);
    expect(
      screen.getByPlaceholderText("Enter your comment"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("allows the user to fill and submit the form", async () => {
    const setMyReview = jest.fn();
    renderWithProviders([successfulMutationMock], {
      userId,
      bookId,
      setMyReview,
    });

    // Fill in the comment
    fireEvent.change(screen.getByPlaceholderText("Enter your comment"), {
      target: { value: "A great read!" },
    });

    // Select a rating
    const fourStarRating = screen.getByRole("radio", { name: "4 stars" });
    fireEvent.click(fourStarRating);

    // Wait for the rating to be visually selected before submitting
    await waitFor(() => {
      expect(fourStarRating).toHaveAttribute("aria-checked", "true");
    });

    // Now that the rating is set, submit the form
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    // Wait for the mutation to complete and the callback to be called
    await waitFor(() => {
      expect(setMyReview).toHaveBeenCalledWith(
        successfulMutationMock.result.data.createReview.review,
      );
    });
  });
});
