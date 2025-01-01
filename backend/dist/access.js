"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = exports.permissions = exports.isSignedIn = void 0;
const fields_1 = require("./schemas/fields");
// At it's simplest, the access control returns a yes or no value depending on the users session
function isSignedIn({ session }) {
    return !!session;
}
exports.isSignedIn = isSignedIn;
const generatedPermissions = Object.fromEntries(fields_1.permissionsList.map((permission) => [
    permission,
    function ({ session }) {
        return !!session?.data.role?.[permission];
    },
]));
exports.permissions = {
    ...generatedPermissions,
    isAwesome({ session }) {
        return true;
    },
};
// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
exports.rules = {
    canManageProducts({ session }) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // 1. Do they have the permission of canManageProducts
        if (exports.permissions.canManageProducts({ session })) {
            return true;
        }
        // 2. If not, do they own this item?
        return { user: { id: session.itemId } };
    },
    canOrder({ session }) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // 1. Do they have the permission of canManageProducts
        if (exports.permissions.canManageCart({ session })) {
            return true;
        }
        // 2. If not, do they own this item?
        return { user: { id: session.itemId } };
    },
    canManageOrderItems({ session }) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // 1. Do they have the permission of canManageProducts
        if (exports.permissions.canManageCart({ session })) {
            return true;
        }
        // 2. If not, do they own this item?
        return { order: { user: { id: session.itemId } } };
    },
    canReadProducts({ session }) {
        if (!isSignedIn({ session })) {
            return false;
        }
        if (exports.permissions.canManageProducts({ session })) {
            return true; // They can read everything!
        }
        // They should only see available products (based on the status field)
        return { status: "AVAILABLE" };
    },
    canManageUsers({ session }) {
        if (!isSignedIn({ session })) {
            return false;
        }
        if (exports.permissions.canManageUsers({ session })) {
            return true;
        }
        // Otherwise they may only update themselves!
        return { id: session.itemId };
    },
};
