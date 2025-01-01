"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendGraphqlSchema = void 0;
const addToCart_1 = require("./addToCart");
const checkout_1 = require("./checkout");
const schema_1 = require("@keystone-next/keystone/schema");
exports.extendGraphqlSchema = schema_1.graphQLSchemaExtension({
    typeDefs: `
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token: String!): Order
      
    }
  `,
    resolvers: {
        Mutation: {
            addToCart: addToCart_1.default,
            checkout: checkout_1.default,
        },
    },
});
