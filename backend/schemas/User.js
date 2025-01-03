"use strict";
exports.__esModule = true;
exports.User = void 0;
var schema_1 = require("@keystone-next/keystone/schema");
var fields_1 = require("@keystone-next/fields");
var access_1 = require("../access");
exports.User = schema_1.list({
    access: {
        create: function () { return true; },
        read: access_1.rules.canManageUsers,
        update: access_1.rules.canManageUsers,
        // only people with the permission can delete themselves!
        // You can't delete yourself
        "delete": access_1.permissions.canManageUsers
    },
    ui: {
        // hide the backend UI from regular users
        hideCreate: function (args) { return !access_1.permissions.canManageUsers(args); },
        hideDelete: function (args) { return !access_1.permissions.canManageUsers(args); }
    },
    fields: {
        name: fields_1.text({ isRequired: true }),
        email: fields_1.text({ isRequired: true, isUnique: true }),
        password: fields_1.password(),
        cart: fields_1.relationship({
            ref: "CartItem.user",
            many: true,
            ui: {
                createView: { fieldMode: "hidden" },
                itemView: { fieldMode: "read" }
            }
        }),
        orders: fields_1.relationship({ ref: "Order.user", many: true }),
        role: fields_1.relationship({
            ref: "Role.assignedTo",
            access: {
                create: access_1.permissions.canManageUsers,
                update: access_1.permissions.canManageUsers
            }
        }),
        products: fields_1.relationship({
            ref: "Product.user",
            many: true
        })
    }
});
