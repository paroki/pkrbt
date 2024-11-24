import { Query } from "@directus/sdk";
import { Kegiatan, Schema } from "@pkrbt/directus";

export type KegiatanQuery = Query<Schema, Kegiatan>;
export type LingkupKegiatan = "paroki" | "wilayah" | "organisasi";
