import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { formatISO, parseISO } from "date-fns";
import EventForm from "@/components/ui/event-form";
import { Provider } from "@/components/ui/provider";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { CREATE_EVENT, CURRENT_USER } from "@/lib/queries";

// Mock next/navigation
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const currentUser = { id: "user-1", name: "Test User", __typename: "User" };

const currentUserMock = {
  request: { query: CURRENT_USER },
  result: {
    data: {
      users: [currentUser],
    },
  },
};

const startsAt = "2025-10-20T10:00";
const endsAt = "2025-10-20T12:00";

const successfulMutationMock = {
  request: {
    query: CREATE_EVENT,
    variables: {
      title: "New Event",
      description: "A new event description.",
      location: "Online",
      userId: currentUser.id,
      startsAt: formatISO(parseISO(startsAt)),
      endsAt: formatISO(parseISO(endsAt)),
    },
  },
  result: {
    data: {
      createEvent: {
        __typename: "CreateEventPayload",
        errors: [],
        event: {
          __typename: "Event",
          id: "new-event-id",
        },
      },
    },
  },
};

const renderWithProviders = (mocks) =>
  render(
    <MockedProvider mocks={mocks} addTypename>
      <CurrentUserProvider>
        <EventForm />
      </CurrentUserProvider>
    </MockedProvider>,
    { wrapper: Provider },
  );

describe("EventForm", () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
  });

  it("renders the form with all fields and a submit button", async () => {
    renderWithProviders([currentUserMock]);

    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter description"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter location")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter starts at")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter ends at")).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // After user is loaded, it should be enabled
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it("allows the user to fill and submit the form, then redirects", async () => {
    renderWithProviders([currentUserMock, successfulMutationMock]);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await waitFor(() => expect(submitButton).toBeEnabled());

    fireEvent.change(screen.getByPlaceholderText("Enter title"), {
      target: { value: "New Event" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter description"), {
      target: { value: "A new event description." },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter location"), {
      target: { value: "Online" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter starts at"), {
      target: { value: startsAt },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter ends at"), {
      target: { value: endsAt },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/events/new-event-id");
    });
  });
});
