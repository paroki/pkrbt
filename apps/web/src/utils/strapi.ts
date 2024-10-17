import { Strapi } from "@pkrbt/openapi";
import { CMS_TOKEN, CMS_URL } from "./config";

const api = new Strapi({
  baseUrl: CMS_URL as string,
  path: "/api",
});

api.fetch.use({
  onRequest({ request }) {
    request.headers.set("Authorization", `Bearer ${CMS_TOKEN}`);
    return request;
  },
});

export default api;
