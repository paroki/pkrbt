import { ErrNotFound } from "@pkrbt/core";
import { describe, expect, it } from "vitest";
import { app } from "../src";
import { pendapatanMock } from "./mocks/prisma";

describe("app", () => {
  it("should translate ErrNotFound to error 404 status", async () => {
    pendapatanMock.search.mockRejectedValue(ErrNotFound);

    const res = await app.request("/pendapatan");

    expect(res.status).toBe(404)
  });
});
