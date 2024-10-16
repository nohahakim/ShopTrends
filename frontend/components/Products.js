import { useQuery } from "@apollo/client"; // Import the useQuery and gql hooks from Apollo Client to query the GraphQL API and parse the query string into a query document, respectively.
import gql from "graphql-tag"; // Import the gql function from graphql-tag to parse the GraphQL query string into a query document. This function is used to define the ALL_PRODUCTS_QUERY constant.
import styled from "styled-components"; // Import the styled-components library to create a styled component for the products list.
import Product from "./Product"; // Import the Product component to display each product in the products list.

// Define a query constant called ALL_PRODUCTS_QUERY that uses the gql template literal to define a GraphQL query to fetch all products from the API. The query fetches the id, name, price, description, and photo fields for each product.

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
