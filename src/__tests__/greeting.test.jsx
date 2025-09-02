import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import Greeting from "@/components/ui/greeting";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { USER_QUERY } from "@/lib/queries";

// Mock GraphQL response
const mocks = [
  {
    request: {
      query: USER_QUERY,
    },
    result: {
      data: {
        users: [
          {
            id: "1",
            name: "Alice",
          },
        ],
      },
    },
  },
];

const renderWithProviders = (ui) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CurrentUserProvider>{ui}</CurrentUserProvider>
    </MockedProvider>,
  );

describe("Greeting", () => {
  it("renders greeting with current user name", async () => {
    renderWithProviders(<Greeting />);

    // Wait for the query to resolve and the component to re-render
    const heading = await waitFor(() =>
      screen.getByRole("heading", { name: /hello, alice!/i }),
    );

    expect(heading).toBeInTheDocument();
  });

  it("renders a level 1 heading", async () => {
    renderWithProviders(<Greeting />);

    const heading = await waitFor(() =>
      screen.getByRole("heading", { level: 1 }),
    );

    expect(heading).toBeInTheDocument();
  });
});
