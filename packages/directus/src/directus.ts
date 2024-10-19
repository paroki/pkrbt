import { createDirectus } from "@directus/sdk";
import invariant from "tiny-invariant";
import { Schema } from "./types";

invariant(process.env.DIRECTUS_ENDPOINT, "DIRECTUS_ENDPOINT not configured.");
const directus = createDirectus<Schema>(process.env.DIRECTUS_ENDPOINT);

export default directus;
