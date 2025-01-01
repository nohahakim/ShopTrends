"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const fields_1 = require("@keystone-next/fields");
const schema_1 = require("@keystone-next/keystone/schema");
const access_1 = require("../access");
const fields_2 = require("./fields");
exports.Role = schema_1.list({
    access: {
        create: access_1.permissions.canManageRoles,
        read: access_1.permissions.canManageRoles,
        update: access_1.permissions.canManageRoles,
        delete: access_1.permissions.canManageRoles,
    },
    ui: {
        hideCreate: (args) => !access_1.permissions.canManageRoles(args),
        hideDelete: (args) => !access_1.permissions.canManageRoles(args),
        isHidden: (args) => !access_1.permissions.canManageRoles(args),
    },
    fields: {
        name: fields_1.text({ isRequired: true }),
        ...fields_2.permissionFields,
        assignedTo: fields_1.relationship({
            ref: "User.role",
            many: true,
            ui: {
                itemView: { fieldMode: "read" },
            },
        }),
    },
});
