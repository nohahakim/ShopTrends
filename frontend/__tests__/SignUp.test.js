import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";
import Signup, { SIGNUP_MUTATION } from "../components/SignUp";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils";

const me = fakeUser();
const password = "wes";
const mocks = [
  // Mutation Mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name,
        },
      },
    },
  },
];

describe("<SignUp/>", () => {
  it("render and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it("calls the mutation properly", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );
    // Type into the boxes
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const signUpButton = screen.getByText(/sign up!/i);

    await userEvent.type(nameInput, me.name);
    await userEvent.type(emailInput, me.email);
    await userEvent.type(passwordInput, password);
    // Click the submit

    await userEvent.click(signUpButton);
    const successMessage = await screen.findByText(
      `Signed up with ${me.email} - Please Go Head and Sign in!`
    );
    expect(successMessage).toBeInTheDocument();
  });
});
