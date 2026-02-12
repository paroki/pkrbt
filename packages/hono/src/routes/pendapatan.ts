import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import auth from "@pkrbt/better-auth";
import { getContext, schema } from "@pkrbt/core";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { pendapatan } from "../config";
import { IdParams } from "./schema";

export const pendapatanRoute = new OpenAPIHono()
  /**
   * GET /
   */
  .openapi(
    createRoute({
      path: "/",
      method: "get",
      operationId: "searchPendapatan",
      description: "Retrieves the collection of Pendapatan resources.",
      request: {
        query: schema.pendapatan.search,
      },
      responses: {
        200: {
          description: "pendapatan resources",
          content: {
            "application/json": {
              schema: schema.pendapatan.collection,
            },
          },
        },
      },
    }),
    async (c) => {
      // check user permissions
      const { user } = getContext();
      const { success, error } = await auth.api.userHasPermission({
        body: {
          role: (user.role ?? "guest") as any,
          permissions: {
            user: ["get"]
          }
        }
      });
      if (error) {
        throw error;
      }
      if (!success) {
        throw new HTTPException(401, {
          message: "anda tidak memiliki hak akses untuk halaman ini",
        });
      }

      const request = c.req.valid("query");
      const data = await pendapatan.search(request);
      return c.json(data);
    },
  )
  /**
   * POST /
   */
  .openapi(
    createRoute({
      method: "post",
      path: "/",
      description: "creates pendapatan resource",
      request: {
        body: {
          content: {
            "application/json": {
              schema: schema.pendapatan.create,
            },
          },
        },
      },
      responses: {
        201: {
          description: "the new pendapatan resource",
          content: {
            "application/json": {
              schema: schema.pendapatan.entity,
            },
          },
        },
      },
    }),
    async (c) => {
      const req = c.req.valid("json");
      const data = await pendapatan.create(req);
      return c.json(data, 201);
    },
  )
  /**
   * GET /{id}
   */
  .openapi(
    createRoute({
      method: "get",
      path: "/{id}",
      description: "retrieves a pendapatan resource",
      request: {
        params: IdParams,
      },
      responses: {
        200: {
          description: "the pendapatan resource",
          content: {
            "application/json": {
              schema: schema.pendapatan.entity,
            },
          },
        },
      },
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const data = await pendapatan.find(id);
      return c.json(data);
    },
  )
  /**
   * PUT /{id}
   */
  .openapi(
    createRoute({
      method: "put",
      path: "/{id}",
      description: "update pendapatan resource",
      request: {
        params: IdParams,
        body: {
          content: {
            "application/json": {
              schema: schema.pendapatan.update,
            },
          },
        },
      },
      responses: {
        200: {
          description: "the updated pendapatan resource",
          content: {
            "application/json": {
              schema: schema.pendapatan.entity,
            },
          },
        },
      },
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      const request = c.req.valid("json");
      const data = await pendapatan.update(id, request);
      return c.json(data, 200);
    },
  )
  /**
   * DELETE /{id}
   */
  .openapi(
    createRoute({
      description: "removes pendapatan resource",
      method: "delete",
      path: "/{id}",
      request: {
        params: IdParams,
      },
      responses: {
        204: {
          description: "pendapatan resource deleted",
        },
      },
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      await pendapatan.delete(id, false);
      return c.body(null, 204);
    },
  );

export type PendapatanRouteType = typeof pendapatanRoute;
