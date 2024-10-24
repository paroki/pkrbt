import { describe, expect, it } from "vitest";
import { Directus } from "../src";

describe("directus", () => {
  it("should load website plugin", () => {
    const directus = new Directus({ baseUrl: "http://localhost:8055" });
    expect(directus).toHaveProperty("post");
    expect(directus.post).toHaveProperty("create");
  });
});
