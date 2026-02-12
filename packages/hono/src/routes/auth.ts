import { OpenAPIHono } from "@hono/zod-openapi";
import auth from "@pkrbt/better-auth";
import type { Context } from "@pkrbt/core";
import { ContextStorage } from "@pkrbt/core";
import { cors } from "hono/cors";

export const authRoute = new OpenAPIHono();

authRoute.on(["POST", "GET"], "/", (c) => {
  return auth.handler(c.req.raw);
});

