"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const fields_1 = require("@keystone-next/fields");
const schema_1 = require("@keystone-next/keystone/schema");
const access_1 = require("../access");
const formatMoney_1 = require("../lib/formatMoney");
exports.Order = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: access_1.rules.canOrder,
        update: () => false,
        delete: () => false,
    },
    fields: {
        label: fields_1.virtual({
            graphQLReturnType: "String",
            resolver(item) {
                return `${formatMoney_1.default(item.total)}`;
            },
        }),
        total: fields_1.integer(),
        items: fields_1.relationship({ ref: "OrderItem.order", many: true }),
        user: fields_1.relationship({ ref: "User.orders" }),
        charge: fields_1.text(),
    },
});
