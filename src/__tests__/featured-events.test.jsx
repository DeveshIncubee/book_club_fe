import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import FeaturedEvents from "@/components/ui/featured-events";
import { Provider } from "@/components/ui/provider";
import { FEATURED_EVENTS } from "@/lib/queries";

// Mock GraphQL response
const mocks = [
  {
    request: {
      query: FEATURED_EVENTS,
    },
    result: {
      data: {
        events: [
          {
            id: "3",
            title: "Discussions on Random Thoughts",
            description: "Lorem Ipsum",
            location: "Mumbai",
            startsAt: "2024-08-29T15:30:00Z",
            endsAt: "2024-08-29T19:30:00Z",
            host: {
              id: "4",
              name: "Rory",
              email: "rory@test.com",
              __typename: "User",
            },
            attendees: [],
            __typename: "Event",
          },
          {
            id: "4",
            title: "Discussions on Random Thoughts",
            description: "Lorem Ipsum",
            location: "Mumbai",
            startsAt: "2024-08-29T15:30:00Z",
            endsAt: "2024-08-29T19:30:00Z",
            host: {
              id: "4",
              name: "Rory",
              email: "rory@test.com",
              __typename: "User",
            },
            attendees: [],
            __typename: "Event",
          },
          {
            id: "5",
            title: "Discussions on Random Thoughts",
            description: "Lorem Ipsum",
            location: "Mumbai",
            startsAt: "2024-08-29T15:30:00Z",
            endsAt: "2024-08-29T19:30:00Z",
            host: {
              id: "4",
              name: "Rory",
              email: "rory@test.com",
              __typename: "User",
            },
            attendees: [],
            __typename: "Event",
          },
          {
            id: "6",
            title: "Discussions on Random Thoughts",
            description: "Lorem Ipsum",
            location: "Mumbai",
            startsAt: "2024-08-29T15:30:00Z",
            endsAt: "2024-08-29T19:30:00Z",
            host: {
              id: "4",
              name: "Rory",
              email: "rory@test.com",
              __typename: "User",
            },
            attendees: [],
            __typename: "Event",
          },
        ],
      },
    },
  },
];

const loadingMocks = [
  {
    request: {
      query: FEATURED_EVENTS,
    },
    result: {
      data: {
        events: [],
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

describe("FeaturedEvents", () => {
  it("renders FeaturedEventSkeleton while loading", () => {
    renderWithProviders(<FeaturedEvents />, loadingMocks);

    const firstSkeleton = screen.getByTestId("featured-event-skeleton-1");
    const secondSkeleton = screen.getByTestId("featured-event-skeleton-2");
    const thirdSkeleton = screen.getByTestId("featured-event-skeleton-3");
    const fourthSkeleton = screen.getByTestId("featured-event-skeleton-4");

    expect(firstSkeleton).toBeInTheDocument();
    expect(secondSkeleton).toBeInTheDocument();
    expect(thirdSkeleton).toBeInTheDocument();
    expect(fourthSkeleton).toBeInTheDocument();
  });
});

describe("FeaturedEvents", () => {
  it("renders FeaturedEvent after successful data fetch", async () => {
    renderWithProviders(<FeaturedEvents />, mocks);

    await waitFor(() => {
      const firstFeaturedEvent = screen.getByTestId("featured-event-3");
      expect(firstFeaturedEvent).toBeInTheDocument();

      const secondFeaturedEvent = screen.getByTestId("featured-event-4");
      expect(secondFeaturedEvent).toBeInTheDocument();

      const thirdFeaturedEvent = screen.getByTestId("featured-event-5");
      expect(thirdFeaturedEvent).toBeInTheDocument();

      const fourthFeaturedEvent = screen.getByTestId("featured-event-6");
      expect(fourthFeaturedEvent).toBeInTheDocument();
    });
  });
});
