import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";
import Router from "next/router"; // We will MOCK THIS
import wait from "waait";
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from "../components/CreateProduct";
import { fakeItem, makePaginationMocksFor } from "../lib/testUtils";
import { ALL_PRODUCTS_QUERY } from "../components/Products";

const item = fakeItem();

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: CREATE_PRODUCT_MUTATION,
      variables: {
        name: item.name,
        description: item.description,
        image: "",
        price: item.price,
      },
    },
    result: {
      data: {
        createProduct: {
          ...item, // all fake item fields
          id: "abc123",
          __typename: "Item",
        },
      },
    },
  },
  {
    request: {
      query: ALL_PRODUCTS_QUERY,
      variables: { skip: 0, first: 2 },
    },
    result: {
      data: {
        allProducts: [item],
      },
    },
  },
];

describe("<CreateProduct />", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles the updating", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateProduct />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/Price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i),
      item.description
    );
    // 3.  check that those boxes are populated!
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/name/i)).toHaveValue(item.name);
    // expect(screen.getByPlaceholderText(/price/i)).toHaveValue(item.price);
    // expect(screen.getByPlaceholderText(/description/i)).toHaveValue(item.description);
  });
  it("creates the items when the form is submitted", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateProduct />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/Price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i),
      item.description
    );
    await userEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => {
      expect(Router.push).toHaveBeenCalled();
      expect(Router.push).toHaveBeenCalledWith({ pathname: "/product/abc123" });
    });
  });
});
