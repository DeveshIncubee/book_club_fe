import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddEventPage from "@/app/events/new/page";
import { Provider } from "@/components/ui/provider";

// Mock the EventForm component since it's tested separately
jest.mock("@/components/ui/event-form", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="event-form" />;
    },
  };
});

const renderWithProviders = (ui) => {
  return render(ui, { wrapper: Provider });
};

describe("AddEventPage", () => {
  it("renders the main heading", () => {
    renderWithProviders(<AddEventPage />);

    const heading = screen.getByRole("heading", {
      name: /add event/i,
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders the EventForm component", () => {
    renderWithProviders(<AddEventPage />);

    const eventForm = screen.getByTestId("event-form");
    expect(eventForm).toBeInTheDocument();
  });
});
