"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const fields_1 = require("@keystone-next/fields");
const schema_1 = require("@keystone-next/keystone/schema");
const access_1 = require("../access");
exports.Product = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: access_1.rules.canReadProducts,
        update: access_1.rules.canManageProducts,
        delete: access_1.rules.canManageProducts,
    },
    fields: {
        name: fields_1.text({ isRequired: true }),
        description: fields_1.text({
            ui: {
                displayMode: "textarea",
            },
        }),
        photo: fields_1.relationship({
            ref: "ProductImage.product",
            ui: {
                displayMode: "cards",
                cardFields: ["image", "altText"],
                inlineCreate: { fields: ["image", "altText"] },
                inlineEdit: { fields: ["image", "altText"] },
            },
        }),
        status: fields_1.select({
            options: [
                { label: "Draft", value: "DRAFT" },
                { label: "Available", value: "AVAILABLE" },
                { label: "Unavailable", value: "UNAVAILABLE" },
            ],
            defaultValue: "DRAFT",
            ui: {
                displayMode: "segmented-control",
                createView: { fieldMode: "hidden" },
            },
        }),
        price: fields_1.integer(),
        user: fields_1.relationship({
            ref: "User.products",
            defaultValue: ({ context }) => ({
                connect: { id: context.session.itemId },
            }),
        }),
    },
});