// import invariant from "tiny-invariant";

export const VERSION = process.env.NEXT_PUBLIC_VERSION ?? "0.0.0-development";
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
export const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "https://api-dev.pkrbt.id";
export const ASSET_URL = `${DIRECTUS_URL}/assets`;
export const PUBLIC_URL =
  process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
