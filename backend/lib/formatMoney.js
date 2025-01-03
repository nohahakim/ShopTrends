"use strict";
exports.__esModule = true;
var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
});
function formatMoney(cents) {
    var dollars = cents / 100;
    return formatter.format(dollars);
}
exports["default"] = formatMoney;
