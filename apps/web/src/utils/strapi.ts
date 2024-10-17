import { Strapi } from "@pkrbt/openapi";
// import invariant from "tiny-invariant";

// invariant(
//  process.env.NEXT_PUBLIC_STRAPI_URL,
//  "Missing NEXT_PUBLIC_STRAPI_URL environment var",
// );
// invariant(process.env.STRAPI_TOKEN, "Missing STRAPI_TOKEN environment var");

export const STRAPI_URL = process.env["NEXT_PUBLIC_STRAPI_URL"];

const accessToken = process.env["STRAPI_TOKEN"] ?? "token";

const api = new Strapi({
  baseUrl: `${STRAPI_URL}`,
  path: "/api",
});

if (accessToken) {
  api.fetch.use({
    onRequest({ request }) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
      return request;
    },
  });
}

export default api;
