"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.rules = exports.permissions = exports.isSignedIn = void 0;
var fields_1 = require("./schemas/fields");
// At it's simplest, the access control returns a yes or no value depending on the users session
function isSignedIn(_a) {
    var session = _a.session;
    return !!session;
}
exports.isSignedIn = isSignedIn;
var generatedPermissions = Object.fromEntries(fields_1.permissionsList.map(function (permission) { return [
    permission,
    function (_a) {
        var _b;
        var session = _a.session;
        return !!((_b = session === null || session === void 0 ? void 0 : session.data.role) === null || _b === void 0 ? void 0 : _b[permission]);
    },
]; }));
exports.permissions = __assign(__assign({}, generatedPermissions), { isAwesome: function (_a) {
        var session = _a.session;
        return true;
    } });
// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
exports.rules = {
    canManageProducts: function (_a) {
        var session = _a.session;
        if (!isSignedIn({ session: session })) {
            return false;
        }
        // 1. Do they have the permission of canManageProducts
        if (exports.permissions.canManageProducts({ session: session })) {
            return true;
        }
        // 2. If not, do they own this item?
        return { user: { id: session.itemId } };
    },
    canOrder: function (_a) {
        var session = _a.session;
        if (!isSignedIn({ session: session })) {
            return false;
        }
        // 1. Do they have the permission of canManageProducts
        if (exports.permissions.canManageCart({ session: session })) {
            return true;
        }
        // 2. If not, do they own this item?
        return { user: { id: session.itemId } };
    },
    canManageOrderItems: function (_a) {
        var session = _a.session;
        if (!isSignedIn({ session: session })) {
            return false;
        }
        // 1. Do they have the permission of canManageProducts
        if (exports.permissions.canManageCart({ session: session })) {
            return true;
        }
        // 2. If not, do they own this item?
        return { order: { user: { id: session.itemId } } };
    },
    canReadProducts: function (_a) {
        var session = _a.session;
        if (!isSignedIn({ session: session })) {
            return false;
        }
        if (exports.permissions.canManageProducts({ session: session })) {
            return true; // They can read everything!
        }
        // They should only see available products (based on the status field)
        return { status: "AVAILABLE" };
    },
    canManageUsers: function (_a) {
        var session = _a.session;
        if (!isSignedIn({ session: session })) {
            return false;
        }
        if (exports.permissions.canManageUsers({ session: session })) {
            return true;
        }
        // Otherwise they may only update themselves!
        return { id: session.itemId };
    }
};
