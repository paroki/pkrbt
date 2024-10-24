import { mockDeep, mockReset } from "vitest-mock-extended";
import { Directus } from "../../src";
import { beforeEach, describe, expect, it } from "vitest";
import { page } from "../../src/website/page";

const mock = mockDeep<Directus>();
const pageItem = {
  title: "Page Title",
};

describe("page plugin", () => {
  const plugin = page(mock);

  beforeEach(() => {
    mockReset(mock);
  });

  it("should provide crud for page", () => {
    expect(plugin).toHaveProperty("create");
    expect(plugin).toHaveProperty("read");
    expect(plugin).toHaveProperty("update");
    expect(plugin).toHaveProperty("remove");
  });

  it("should read by slug", async () => {
    mock.graphql.query.mockResolvedValue({ page_by_id: pageItem });
    mock.rest.request.mockResolvedValue([{ id: "some-id" }]);

    const { item, error } = await plugin.readBySlug("some-slug");

    expect(error).toBeUndefined();
    expect(item).toBeDefined();
    expect(item).toStrictEqual(pageItem);
  });
});
