import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { Directus, Post, restMethods } from "../src";

vi.mock("@directus/sdk");
const directus = mockDeep<Directus>();
const postItem: Partial<Post> = {
  id: "some-id",
  title: "Post Title",
};
describe("rest", () => {
  const rest = restMethods<Post>(directus, "post");

  beforeEach(() => {
    mockReset(directus);
  });

  it("should create new item", async () => {
    const sdk = await import("@directus/sdk");
    sdk.createItem = vi.fn();

    directus.rest.request.mockResolvedValue(postItem);

    const result = await rest.create(postItem);

    expect(sdk.createItem).toHaveBeenCalled();
    expect(result.error).toBeUndefined();
    expect(result.item).toBeDefined();
    expect(result.item).toStrictEqual(postItem);
  });

  it("should update an item", async () => {
    const sdk = await import("@directus/sdk");
    sdk.updateItem = vi.fn();

    directus.rest.request.mockResolvedValue(postItem);
    const result = await rest.update(postItem);

    expect(sdk.updateItem).toHaveBeenCalled();
    expect(result.error).toBeUndefined();
    expect(result.item).toBeDefined();
    expect(result.item).toStrictEqual(postItem);
  });

  it("should remove an item", async () => {
    const sdk = await import("@directus/sdk");
    sdk.deleteItem = vi.fn();

    await rest.remove(postItem.id as string);

    expect(sdk.deleteItem).toHaveBeenCalled();
    expect(directus.rest.request).toBeCalled();
  });

  it("should find item by id", async () => {
    const sdk = await import("@directus/sdk");
    sdk.readItems = vi.fn();

    directus.rest.request.mockResolvedValue([{ id: "some-id" }]);

    const { id, error } = await rest.findId({
      filter: { slug: { _eq: "some-slug" } },
    });
    expect(sdk.readItems).toHaveBeenCalled();
    expect(sdk.readItems).toHaveBeenCalledWith("post", {
      filter: {
        slug: {
          _eq: "some-slug",
        },
      },
      limit: 1,
      fields: ["id"],
    });
    expect(id).toEqual("some-id");
    expect(error).toBeUndefined();
  });
});
