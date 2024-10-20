import { describe, expect, it } from "vitest";
import { Directus } from "../src";

const endpoint = "http://localhost";

describe("directus", () => {
  it("should initialize with defaults", () => {
    const o = new Directus({ endpoint });
    expect(o.options.clientOptions).toBeUndefined();
  });

  it("should initialize plugins", () => {
    const o = new Directus({ endpoint });

    expect(o.page).toBeDefined();
  });
});
