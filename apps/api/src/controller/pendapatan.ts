import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import { service, schema } from "@pkrbt/core";
import { pager } from "../../../../packages/core/src/schema/api";

export const pendapatan = new Hono();

pendapatan.get(
  "/pendapatan",
  describeRoute({
    description: "daftar pendapatan",
    operationId: "searchPendapatan",
    responses: {
      200: {
        description: "success",
        content: {
          "application/json": {
            schema: resolver(schema.pendapatan.search.response),
          },
        },
      },
    },
  }),
  validator("query", schema.pendapatan.search.request),
  async (c) => {
    const payload = c.req.valid("query");
    const { data, total } = await service.pendapatan.search(payload);
    return c.json({
      data,
      pager: {
        ...payload,
        total: total,
      },
    });
  },
);
