"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@keystone-next/auth");
const schema_1 = require("@keystone-next/keystone/schema");
const session_1 = require("@keystone-next/keystone/session");
const fields_1 = require("./schemas/fields");
const Role_1 = require("./schemas/Role");
const OrderItem_1 = require("./schemas/OrderItem");
const Order_1 = require("./schemas/Order");
const CartItem_1 = require("./schemas/CartItem");
const ProductImage_1 = require("./schemas/ProductImage");
const Product_1 = require("./schemas/Product");
const User_1 = require("./schemas/User");
require("dotenv/config");
const seed_data_1 = require("./seed-data");
const mail_1 = require("./lib/mail");
const mutations_1 = require("./mutations");
function check(name) { }
const databaseURL = process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET,
};
const { withAuth } = auth_1.createAuth({
    listKey: "User",
    identityField: "email",
    secretField: "password",
    initFirstItem: {
        fields: ["name", "email", "password"],
    },
    passwordResetLink: {
        async sendToken(args) {
            // send the email
            await mail_1.sendPasswordResetEmail(args.token, args.identity);
        },
    },
});
exports.default = withAuth(schema_1.config({
    // @ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: "mongoose",
        url: databaseURL,
        async onConnect(keystone) {
            console.log("Connected to the database!");
            if (process.argv.includes("--seed-data")) {
                await seed_data_1.insertSeedData(keystone);
            }
        },
    },
    lists: schema_1.createSchema({
        // Schema items go in here
        User: User_1.User,
        Product: Product_1.Product,
        ProductImage: ProductImage_1.ProductImage,
        CartItem: CartItem_1.CartItem,
        OrderItem: OrderItem_1.OrderItem,
        Order: Order_1.Order,
        Role: Role_1.Role,
    }),
    extendGraphqlSchema: mutations_1.extendGraphqlSchema,
    ui: {
        // Show the UI only for poeple who pass this test
        isAccessAllowed: ({ session }) => 
        // console.log(session);
        !!session?.data,
    },
    session: session_1.withItemData(session_1.statelessSessions(sessionConfig), {
        // GraphQL Query
        User: `id name email role { ${fields_1.permissionsList.join(" ")} }`,
    }),
}));
