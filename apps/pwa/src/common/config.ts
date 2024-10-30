export const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055";
export const PUBLIC_URL =
  process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
export const DEVELOPMENT = process.env.NODE_ENV !== "production";

export const DIRECTUS_AUTH_REFRESH_URL = `${DIRECTUS_URL}/auth/refresh`;
export const DIRECTUS_TOKEN_NAME =
  process.env.NEXT_PUBLIC_DIRECTUS_TOKEN_NAME ?? "directus_session_token";
