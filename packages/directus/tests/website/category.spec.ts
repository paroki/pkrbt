import { mockDeep } from "vitest-mock-extended";
import { Directus } from "../../src";
import { describe, expect, it, vi } from "vitest";
import { category } from "../../src/website/category";

const mock = mockDeep<Directus>();
vi.mock("@directus/sdk");

const categoryItem = {
  id: "some-id",
  title: "some-title",
};

describe("category", () => {
  it("should search category", async () => {
    mock.rest.request.mockResolvedValue([categoryItem]);
    const sdk = await import("@directus/sdk");
    sdk.readItems = vi.fn();

    const plugin = category(mock);
    const result = await plugin.search("keyword");

    expect(sdk.readItems).toHaveBeenCalledOnce();
    expect(sdk.readItems).toHaveBeenCalledWith("category", {
      search: "keyword",
    });
    expect(result).toStrictEqual([categoryItem]);
  });

  it("should create category", async () => {
    mock.rest.request.mockResolvedValue(categoryItem);
    const sdk = await import("@directus/sdk");
    sdk.createItem = vi.fn();

    const plugin = category(mock);
    const result = await plugin.create(categoryItem);

    expect(sdk.createItem).toHaveBeenCalledOnce();
    expect(sdk.createItem).toHaveBeenCalledWith("category", categoryItem);
    expect(result).toStrictEqual(categoryItem);
  });

  it("should remove category", async () => {
    mock.rest.request.mockResolvedValue(categoryItem);
    const sdk = await import("@directus/sdk");
    sdk.deleteItem = vi.fn();

    const plugin = category(mock);
    const result = await plugin.remove(categoryItem.id);

    expect(sdk.deleteItem).toHaveBeenCalledOnce();
    expect(sdk.deleteItem).toHaveBeenCalledWith("category", categoryItem.id);
    expect(result).toBeUndefined();
  });
});
