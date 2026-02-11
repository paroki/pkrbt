import type { PrismaClient } from "@pkrbt/prisma";
import { beforeEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

vi.mock(import("@pkrbt/prisma"), async(actual) => {
  const def = await actual()
  return {
    ...def,
    default: prismaMock
  }
})

const prismaMock = mockDeep<PrismaClient>();
beforeEach(() => {
  mockReset(prismaMock)
});

export default prismaMock
