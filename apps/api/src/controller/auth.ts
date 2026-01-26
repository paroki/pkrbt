import { Hono } from "hono";
import { auth } from "@pkrbt/auth/server";
import { cors } from "hono/cors";

const ctl = new Hono();

ctl.use(
  "/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:2000",
      "https://pkrbt.id",
      "https://dash.pkrbt.id",
    ], // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

ctl.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export { ctl as auth };
