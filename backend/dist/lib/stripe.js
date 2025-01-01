"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("stripe");
const stripeConfig = new stripe_1.default(process.env.STRIPE_SECRET || "", {
    apiVersion: "2020-08-27",
});
exports.default = stripeConfig;
