"use strict";
exports.__esModule = true;
exports.extendGraphqlSchema = void 0;
var addToCart_1 = require("./addToCart");
var checkout_1 = require("./checkout");
var schema_1 = require("@keystone-next/keystone/schema");
exports.extendGraphqlSchema = schema_1.graphQLSchemaExtension({
    typeDefs: "\n    type Mutation {\n      addToCart(productId: ID): CartItem\n      checkout(token: String!): Order\n      \n    }\n  ",
    resolvers: {
        Mutation: {
            addToCart: addToCart_1["default"],
            checkout: checkout_1["default"]
        }
    }
});
