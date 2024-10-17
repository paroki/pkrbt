// import invariant from "tiny-invariant";

/*
invariant(
  process.env.NEXT_PUBLIC_VERSION,
  "NEXT_PUBLIC_VERSION not configured",
);
invariant(process.env.CMS_TOKEN, "CMS_TOKEN not configured!");
invariant(process.env.NEXT_PUBLIC_CMS_URL, "CMS_URL not configured!");
invariant(
  process.env.GOOGLE_ANALYTICS_ID,
  "GOOGLE_ANALYTICS_ID not configured!",
);
*/

export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
export const VERSION = process.env.NEXT_PUBLIC_VERSION;
export const CMS_TOKEN = process.env.CMS_TOKEN;
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
