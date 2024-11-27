import { DirectusFile } from "@directus/sdk";
import { Schema } from "@pkrbt/directus";

export type DirectusFileType = DirectusFile<Schema>;
export type DirectusFiles = DirectusFileType[];
