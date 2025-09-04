import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeaturedEvent from "@/components/ui/featured-event";
import { Provider } from "@/components/ui/provider";

describe("FeaturedEvent", () => {
  it("renders contents of the event", () => {
    const event = {
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
    };

    render(<FeaturedEvent event={event} />, { wrapper: Provider });

    const title = screen.getByText(/discussions on random thoughts/i);
    expect(title).toBeInTheDocument();

    const host = screen.getByText(/rory/i);
    expect(host).toBeInTheDocument();

    const location = screen.getByText(/mumbai/i);
    expect(location).toBeInTheDocument();

    const startsAt = screen.getByText(/29th aug/i);
    expect(startsAt).toBeInTheDocument();
  });

  it("renders contents of the event but with missing startsAt", () => {
    const event = {
      id: "3",
      title: "Discussions on Random Thoughts",
      description: "Lorem Ipsum",
      location: "Mumbai",
      endsAt: "2024-08-29T19:30:00Z",
      host: {
        id: "4",
        name: "Rory",
        email: "rory@test.com",
        __typename: "User",
      },
      attendees: [],
      __typename: "Event",
    };

    render(<FeaturedEvent event={event} />, { wrapper: Provider });

    const title = screen.getByText(/discussions on random thoughts/i);
    expect(title).toBeInTheDocument();

    const host = screen.getByText(/rory/i);
    expect(host).toBeInTheDocument();

    const location = screen.getByText(/mumbai/i);
    expect(location).toBeInTheDocument();

    const startsAt = screen.queryByText(/29th aug/i);
    expect(startsAt).toBeNull();
  });
});
