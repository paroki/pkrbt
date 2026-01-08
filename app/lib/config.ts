import invariant from "tiny-invariant";

const {
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
} = process.env;

invariant(GOOGLE_CLIENT_ID, "google client id not configured");
invariant(GOOGLE_CLIENT_SECRET, "google client secret not configured");
invariant(BETTER_AUTH_URL, "better auth url unconfigured");
invariant(BETTER_AUTH_SECRET, "better auth secret unconfigured");

export const IS_PRODUCTION = NODE_ENV === "production";
export {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
};
