import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";
import { DEVELOPMENT } from "./config.server";
import { Permissions } from "~/common/types";

invariant(
  process.env.AUTH_SECRET,
  "AUTH_SECRET environment should be defined.",
);

const AUTH_SECRET = process.env.AUTH_SECRET;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "pkrbt_auth",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [AUTH_SECRET],
    secure: !DEVELOPMENT,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const permissions = createCookieSessionStorage<Permissions>({
  cookie: {
    name: "pkrbt_permissions",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [AUTH_SECRET],
    secure: !DEVELOPMENT,
  },
});
