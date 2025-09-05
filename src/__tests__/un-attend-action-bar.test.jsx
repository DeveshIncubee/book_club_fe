import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import UnAttendActionBar from "@/components/ui/un-attend-action-bar";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { ATTEND_EVENT, CURRENT_USER, UNATTEND_EVENT } from "@/lib/queries";

// Mock next/navigation
const mockRouterRefresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRouterRefresh,
  }),
}));

const eventId = "event-1";
const host = { id: "user-host", name: "Host User", __typename: "User" };
const attendeeInEvent = {
  id: "user-attendee",
  name: "Attendee User",
  __typename: "User",
};
const nonAttendeeUser = {
  id: "user-non-attendee",
  name: "Non Attendee User",
};

const attendees = [attendeeInEvent];

// Mocks for CurrentUserProvider
const attendeeUserMock = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: { users: [{ id: attendeeInEvent.id, name: attendeeInEvent.name }] },
    },
  },
];

const nonAttendeeUserMock = [
  {
    request: { query: CURRENT_USER },
    result: {
      data: {
        users: [{ id: nonAttendeeUser.id, name: nonAttendeeUser.name }],
      },
    },
  },
];

const hostUserMock = [
  {
    request: { query: CURRENT_USER },
    result: { data: { users: [{ id: host.id, name: host.name }] } },
  },
];

const noUserMock = [
  {
    request: { query: CURRENT_USER },
    result: { data: { users: [] } },
  },
];

// Mocks for mutations
const attendMutationMock = {
  request: {
    query: ATTEND_EVENT,
    variables: { userId: nonAttendeeUser.id, eventId },
  },
  result: {
    data: {
      attendEvent: {
        __typename: "AttendEventPayload",
        event: {
          __typename: "Event",
          id: eventId,
        },
      },
    },
  },
};

const unattendMutationMock = {
  request: {
    query: UNATTEND_EVENT,
    variables: { userId: attendeeInEvent.id, eventId },
  },
  result: {
    data: {
      unattendEvent: {
        __typename: "UnattendEventPayload",
        event: {
          __typename: "Event",
          id: eventId,
        },
      },
    },
  },
};

// Helper to render with providers
const renderWithProviders = (ui, mocks) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CurrentUserProvider>{ui}</CurrentUserProvider>
    </MockedProvider>,
    { wrapper: Provider },
  );

describe("UnAttendActionBar", () => {
  beforeEach(() => {
    mockRouterRefresh.mockClear();
  });

  it("renders a skeleton while loading", () => {
    const { container } = renderWithProviders(
      <UnAttendActionBar eventId={eventId} host={host} attendees={attendees} />,
      noUserMock, // Provide mock to prevent apollo warning
    );
    expect(container.querySelector(".chakra-skeleton")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders 'Attend Event' button for a non-attending user", async () => {
    renderWithProviders(
      <UnAttendActionBar eventId={eventId} host={host} attendees={attendees} />,
      nonAttendeeUserMock,
    );

    const button = await screen.findByRole("button", { name: /attend event/i });
    expect(button).toBeInTheDocument();
  });

  it("calls attend mutation when 'Attend Event' is clicked", async () => {
    const mocks = [...nonAttendeeUserMock, attendMutationMock];
    renderWithProviders(
      <UnAttendActionBar eventId={eventId} host={host} attendees={attendees} />,
      mocks,
    );

    const button = await screen.findByRole("button", { name: /attend event/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRouterRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("renders 'Unattend Event' button for an attending user", async () => {
    renderWithProviders(
      <UnAttendActionBar eventId={eventId} host={host} attendees={attendees} />,
      attendeeUserMock,
    );

    const button = await screen.findByRole("button", {
      name: /unattend event/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("calls unattend mutation when 'Unattend Event' is clicked", async () => {
    const mocks = [...attendeeUserMock, unattendMutationMock];
    renderWithProviders(
      <UnAttendActionBar eventId={eventId} host={host} attendees={attendees} />,
      mocks,
    );

    const button = await screen.findByRole("button", {
      name: /unattend event/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRouterRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("renders nothing when the current user is the host", async () => {
    const { container } = renderWithProviders(
      <UnAttendActionBar eventId={eventId} host={host} attendees={attendees} />,
      hostUserMock,
    );

    await waitFor(() => {
      expect(
        container.querySelector(".chakra-skeleton"),
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
