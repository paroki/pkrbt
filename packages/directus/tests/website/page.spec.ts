import { describe, expect, it, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { Directus, Page } from "../../src";
import { page } from "../../src/website/page";
import { beforeEach } from "node:test";

const mock = mockDeep<Directus>();
vi.mock("@directus/sdk");

const pageItem: Page = {
  id: "some-id",
  title: "some-title",
};

describe("page", () => {
  beforeEach(() => {
    mockReset(mock);
  });

  it("getBySlug", async () => {
    const expected: Page = {
      title: "Hello World",
    };

    mock.graphql.query.mockResolvedValue({ page: [expected] });
    const plugin = page(mock);

    const result = await plugin.getBySlug("test");
    expect(mock.graphql.query).toBeCalled();
    expect(result).toBe(expected);
  });

  it("create", async () => {
    mock.rest.request.mockResolvedValue(pageItem);

    const sdk = await import("@directus/sdk");
    sdk.createItem = vi.fn();

    const plugin = page(mock);
    const result = await plugin.create(pageItem);
    expect(sdk.createItem).toHaveBeenCalled();
    expect(sdk.createItem).toHaveBeenCalledWith("page", pageItem);
    expect(result).toStrictEqual(pageItem);
  });

  it("remove", async () => {
    const sdk = await import("@directus/sdk");
    sdk.deleteItem = vi.fn();

    const plugin = page(mock);
    const result = await plugin.remove("some-id");
    expect(sdk.deleteItem).toHaveBeenCalled();
    expect(sdk.deleteItem).toHaveBeenCalledWith("page", "some-id");
    expect(result).toBeUndefined();
  });
});
