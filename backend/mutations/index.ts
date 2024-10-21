import { GraphQLSchemaExtension } from "@keystone-next/types";
import addToCart from "./addToCart";
import checkout from "./checkout";
import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token: String!): Order
      
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});
