import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import AllEvents from "@/components/ui/all-events";
import { Provider } from "@/components/ui/provider";
import { ALL_EVENTS } from "@/lib/queries";

// Mock GraphQL response
const mocks = [
  {
    request: {
      query: ALL_EVENTS,
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
      query: ALL_EVENTS,
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

describe("AllEvents", () => {
  it("renders EventSkeleton while loading", () => {
    renderWithProviders(<AllEvents />, loadingMocks);

    const firstSkeleton = screen.getByTestId("event-skeleton-1");
    const secondSkeleton = screen.getByTestId("event-skeleton-2");
    const thirdSkeleton = screen.getByTestId("event-skeleton-3");
    const fourthSkeleton = screen.getByTestId("event-skeleton-4");

    expect(firstSkeleton).toBeInTheDocument();
    expect(secondSkeleton).toBeInTheDocument();
    expect(thirdSkeleton).toBeInTheDocument();
    expect(fourthSkeleton).toBeInTheDocument();
  });
});

describe("AllEvents", () => {
  it("renders Event after successful data fetch", async () => {
    renderWithProviders(<AllEvents />, mocks);

    await waitFor(() => {
      const firstEvent = screen.getByTestId("event-3");
      expect(firstEvent).toBeInTheDocument();

      const secondEvent = screen.getByTestId("event-4");
      expect(secondEvent).toBeInTheDocument();

      const thirdEvent = screen.getByTestId("event-5");
      expect(thirdEvent).toBeInTheDocument();

      const fourthEvent = screen.getByTestId("event-6");
      expect(fourthEvent).toBeInTheDocument();
    });
  });
});
