import type auth from "@pkrbt/better-auth";
import { afterEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

vi.mock(
  import("@pkrbt/better-auth"), async(importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      default: authMock
    };
  });

export const authMock = mockDeep<typeof auth>();

afterEach(() => {
  mockReset(authMock)
})
