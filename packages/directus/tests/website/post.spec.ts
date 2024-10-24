import { describe, expect, it, beforeEach, vi } from "vitest";
import { post } from "../../src/website/post";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { Directus } from "../../src";

vi.mock("@directus/sdk");
const mock = mockDeep<Directus>();
const postItem = {
  title: "Post Title",
};

describe("directus.post plugin", () => {
  const plugin = post(mock);

  beforeEach(() => {
    mockReset(mock);
  });

  it("should have crud methods", async () => {
    expect(plugin).toHaveProperty("search");
    expect(plugin).toHaveProperty("create");
    expect(plugin).toHaveProperty("update");
    expect(plugin).toHaveProperty("remove");
  });

  it("should read by slug", async () => {
    mock.graphql.query.mockResolvedValue({ post_by_id: postItem });
    mock.rest.request.mockResolvedValue([{ id: "some-id" }]);

    const { item, error } = await plugin.readBySlug("some-slug");

    expect(error).toBeUndefined();
    expect(item).toBeDefined();
    expect(item).toStrictEqual(postItem);
  });

  it("should search posts", async () => {
    mock.graphql.query.mockResolvedValue({
      post: [postItem],
      post_aggregated: {
        count: {
          id: 30,
        },
      },
    });

    const { items, error, meta } = await plugin.search({ keyword: "test" });

    expect(error).toBeUndefined();
    expect(items).toStrictEqual([postItem]);
    expect(meta.page).toBe(1);
    expect(meta.nextPage).toBe(2);
  });
});
