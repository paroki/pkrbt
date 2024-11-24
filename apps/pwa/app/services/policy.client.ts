import {
  Collection,
  PermissionAccess,
  PermissionAction,
  Permissions,
} from "~/common/types";
import localforage from "localforage";
import { redirect } from "@remix-pwa/sw";

export async function isRouteGranted(
  collection: Collection,
  action: PermissionAction,
  access: PermissionAccess = "full",
) {
  const permissions = await localforage.getItem<Permissions>("permissions");

  const response = redirect("/unauthorized", {
    status: 403,
    statusText: "Forbidden",
  });

  if (null === permissions) {
    throw response;
  }

  if (!Object.keys(permissions).includes(collection)) {
    throw response;
  }

  const requiredAccess = [access];
  const accessPolicy = permissions[collection][action]["access"];
  if (requiredAccess.includes(accessPolicy)) {
    return true;
  }

  throw response;
}
