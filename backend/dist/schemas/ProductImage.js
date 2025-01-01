"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = exports.cloudinary = void 0;
require("dotenv/config");
const fields_1 = require("@keystone-next/fields");
const schema_1 = require("@keystone-next/keystone/schema");
const cloudinary_1 = require("@keystone-next/cloudinary");
const access_1 = require("../access");
exports.cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: "sickfits",
};
exports.ProductImage = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: () => true,
        update: access_1.permissions.canManageProducts,
        delete: access_1.permissions.canManageProducts,
    },
    fields: {
        image: cloudinary_1.cloudinaryImage({
            cloudinary: exports.cloudinary,
            label: "Source",
        }),
        altText: fields_1.text(),
        product: fields_1.relationship({ ref: "Product.photo" }),
    },
    ui: {
        listView: {
            initialColumns: ["image", "altText", "product"],
        },
    },
});
