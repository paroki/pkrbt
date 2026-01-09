import { createAccessControl } from "better-auth/plugins";
import {
  adminAc,
  defaultStatements,
  memberAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  pendapatan: ["create", "update", "delete", "view"],
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "set-password",
    "delete",
    "get",
    "update",
  ],
} as const;

const ac = createAccessControl(statement);

const user = ac.newRole({
  ...memberAc.statements,
});

const admin = ac.newRole({
  ...adminAc.statements,
  user: ["create", "update", "delete", "list", "get", "set-role"],
});

export const permissions = {
  ac,
  roles: {
    admin,
    user,
  },
};
