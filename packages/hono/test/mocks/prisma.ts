import type { IPendapatanService } from "@pkrbt/core";
import { afterEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

vi.mock(
  import("@pkrbt/core"), async(importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      pendapatan: pendapatanMock,
    };
  });

export const pendapatanMock = mockDeep<IPendapatanService>();

afterEach(() => {
  mockReset(pendapatanMock)
})
