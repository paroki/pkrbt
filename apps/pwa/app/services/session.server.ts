import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";
import { DEVELOPMENT } from "./config.server";

invariant(
  process.env.AUTH_SECRET,
  "AUTH_SECRET environment should be defined.",
);

const AUTH_SECRET = process.env.AUTH_SECRET;

const maxAge = 60 * 60 * 24 * 6;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "pkrbt_auth",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [AUTH_SECRET],
    secure: !DEVELOPMENT,
    maxAge: maxAge,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
