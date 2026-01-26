import { Hono } from "hono";
import { auth, pendapatan } from "./controller";
import { ZodError } from "@pkrbt/utils";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.route("/", auth);
app.route("/", pendapatan);

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      message: err.message,
    });
  } else {
    c.status(500);
    return c.json({
      message: err.message,
    });
  }
});

export default {
  port: 2000,
  fetch: app.fetch,
};
