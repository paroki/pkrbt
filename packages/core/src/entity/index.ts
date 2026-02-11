import type auth from "@pkrbt/better-auth";
import type { Prisma } from "@pkrbt/prisma";
import type { schema } from "../schema";
import type {z} from "../util";

export type EntityType = {
  id: string;
  [key: string]: any;
};

export type User = Prisma.UserModel | typeof auth.$Infer.Session.user;
export type Session = Prisma.SessionModel | typeof auth.$Infer.Session.session;
export type Pendapatan = z.infer<typeof schema.pendapatan.entity>;
