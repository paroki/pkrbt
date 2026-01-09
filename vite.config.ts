import { sentryReactRouter } from "@sentry/react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(config => ({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), sentryReactRouter({
    org: "pkrbt-developer",
    project: "pkrbt",
    authToken: process.env.SENTRY_AUTH_TOKEN
  }, config)]
}));