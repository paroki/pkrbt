export const DIRECTUS_URL = process.env.DIRECTUS_URL ?? "http://localhost:8055";
export const PUBLIC_URL = process.env.PUBLIC_URL ?? "http://localhost:5173";
export const DEVELOPMENT = process.env.NODE_ENV !== "production";
export const AUTH_DIRECTUS_SESSION_COOKIE_NAME =
  process.env.DIRECTUS_SESSION_COOKIE_NAME ?? "pkrbt_directus_local";
