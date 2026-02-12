import { OpenAPIHono } from "@hono/zod-openapi";
import { BaseError, isNotFound } from "@pkrbt/core";
import { cors } from "hono/cors";
import { coreContext } from "./middleware/context";
import { authRoute, pendapatanRoute } from "./routes";

export const app = new OpenAPIHono()
  .doc31("/openapi.json", {
    openapi: "3.1.0",
    info: {
      title: "PKRBT",
      description: "API untuk layanan informasi PKRBT",
      version: "v1",
      license: { name: "MIT", url: "https://pkrbt.id/LICENSE" },
      contact: {
        name: "PKRBT Developers",
        email: "me@itstoni.com",
        url: "https://github.com/paroki/developers",
      },
    },
    servers: [
      { url: "http://localhost:4000", description: "Local Development Server" },
    ],
  })
  .use(
    "*",
    cors({
      origin: "http://localhost:4000",
      credentials: true,
    }),
  )
  .use("*", coreContext)
  .route("/auth", authRoute)
  .route("/pendapatan", pendapatanRoute)

app.onError((err, c) => {
  if (err instanceof BaseError) {
    if (isNotFound(err)) {
      return c.json({ code: err.code, message: err.message }, 404);
    }
  }

  return c.json({ message: "Internal server error", status: 500 }, 500);
});
;

