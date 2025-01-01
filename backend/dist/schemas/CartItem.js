"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const fields_1 = require("@keystone-next/fields");
const schema_1 = require("@keystone-next/keystone/schema");
const access_1 = require("../access");
exports.CartItem = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: access_1.rules.canOrder,
        update: access_1.rules.canOrder,
        delete: access_1.rules.canOrder,
    },
    ui: {
        listView: {
            initialColumns: ["product", "quantity", "user"],
        },
    },
    fields: {
        // TODO: Custom Label in here
        quantity: fields_1.integer({
            defaultValue: 1,
            isRequired: true,
        }),
        product: fields_1.relationship({ ref: "Product" }),
        user: fields_1.relationship({ ref: "User.cart" }),
    },
});
