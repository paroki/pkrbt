import { mockDeep, mockReset } from "vitest-mock-extended";
import { Directus } from "../../src";
import { beforeEach, describe, expect, it } from "vitest";
import { category } from "../../src/website/category";

const directus = mockDeep<Directus>();
const categoryItem = {
  title: "Page Title",
};

describe("directus.category", () => {
  const plugin = category(directus);
  beforeEach(() => {
    mockReset(directus);
  });

  it("should provide category crud operations", () => {
    expect(plugin).toHaveProperty("create");
    expect(plugin).toHaveProperty("read");
    expect(plugin).toHaveProperty("update");
    expect(plugin).toHaveProperty("remove");
  });

  it("should read by id", async () => {
    directus.graphql.query.mockResolvedValue({ category_by_id: categoryItem });

    const { item, error } = await plugin.read("some-id");

    expect(error).toBeUndefined();
    expect(item).toBeDefined();
    expect(item).toStrictEqual(categoryItem);
  });
});
