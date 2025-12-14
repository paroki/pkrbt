import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/auth/*", "routes/auth.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
