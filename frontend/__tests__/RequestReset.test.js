import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from "../components/RequestReset";

const email = "sara@example.com";
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: { data: { sendUserPasswordResetLink: null } },
  },
];

describe("<RequestRest />", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset mocks={mocks} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it("allows the user to type an email", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RequestReset />
      </MockedProvider>
    );
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const signUpButton = screen.getByText(/request reset/i);
    // Simulate typing here
    await userEvent.type(emailInput, email);
    expect(emailInput).toHaveValue(email);
    await userEvent.click(signUpButton);
    const successMessage = await screen.findByText(
      `Success! Check your email for a link!`
    );
    expect(successMessage).toBeInTheDocument();
  });
});
