import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import { notFound } from "next/navigation";
import EventDetailPage from "@/app/events/[id]/page";
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
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

const eventId = "1";

const mockEvent = {
  id: eventId,
  title: "Tech Talk",
  description: "A talk about new technologies.",
  location: "Online",
  startsAt: "2025-10-20T10:00:00Z",
  endsAt: "2025-10-20T11:00:00Z",
  host: {
    id: "user-host",
    name: "Host User",
    __typename: "User",
  },
  attendees: [
    {
      id: "user-2",
      name: "Jane Doe",
      __typename: "User",
    },
  ],
  __typename: "Event",
};

// Mocks for CurrentUserProvider used by child client components (like UnAttendActionBar)
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

describe("EventDetailPage", () => {
  beforeEach(() => {
    query.mockClear();
    notFound.mockClear();
  });

  it("renders event details after successful data fetch", async () => {
    query.mockResolvedValue({ data: { event: mockEvent } });

    const Page = await EventDetailPage({ params: { id: eventId } });
    renderWithProviders(Page);

    expect(screen.getByText("Tech Talk")).toBeInTheDocument();
    expect(screen.getByText(/Host User/i)).toBeInTheDocument();
    expect(screen.getByText(/Online/i)).toBeInTheDocument();
    expect(
      screen.getByText("A talk about new technologies."),
    ).toBeInTheDocument();

    // Check formatted dates
    expect(screen.getByText("Starts on:").parentElement).toHaveTextContent(
      /20th Oct 2025/,
    );
    expect(screen.getByText("Ends on:").parentElement).toHaveTextContent(
      /20th Oct 2025/,
    );

    // Check for attendees
    await waitFor(() => {
      expect(screen.getByText("Attendees (1)")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });

    // UnAttendActionBar will be rendered. The currentUser is 'John Doe', who is not an attendee.
    // So it should show 'Attend Event' button.
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /attend event/i }),
      ).toBeInTheDocument();
    });
  });

  it("calls notFound on data fetch error", async () => {
    query.mockResolvedValue({ error: new Error("Not found") });

    await expect(EventDetailPage({ params: { id: eventId } })).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );

    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("renders correctly when there are no attendees", async () => {
    const eventWithoutAttendees = { ...mockEvent, attendees: [] };
    query.mockResolvedValue({ data: { event: eventWithoutAttendees } });

    const Page = await EventDetailPage({ params: { id: eventId } });
    renderWithProviders(Page);

    expect(screen.getByText("Tech Talk")).toBeInTheDocument();
    expect(screen.queryByText(/Attendees/)).not.toBeInTheDocument();
  });
});
