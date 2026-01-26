import { beforeEach, mock } from "bun:test";
import {
  DeepMockProxy,
  mockDeep,
  mockReset,
} from "@tkoehlerlg/bun-mock-extended";
import * as db from "@pkrbt/db";

mock.module("@pkrbt/db", () => ({
  ...db,
  prisma: mockDeep<db.PrismaClient>({ funcPropSupport: true }),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  db.prisma as unknown as DeepMockProxy<db.PrismaClient>;
