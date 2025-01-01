"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});
function formatMoney(cents) {
    const dollars = cents / 100;
    return formatter.format(dollars);
}
exports.default = formatMoney;
