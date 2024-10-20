import { mockDeep, mockReset } from "vitest-mock-extended";
import { Directus, Post } from "../../src";
import { beforeEach, describe, it } from "vitest";
import { post } from "../../src/website/post";
import { expect } from "vitest";

const mock = mockDeep<Directus>();
const postItem: Post = {
  id: "some-id",
  title: "Some Title",
};

describe("post", () => {
  beforeEach(() => {
    mockReset(mock);
  });

  it("getBySlug", async () => {
    mock.graphql.query.mockResolvedValue({
      post: [postItem],
    });

    const plugin = post(mock);
    const result = await plugin.getBySlug("some-slug");

    expect(result).toBe(postItem);
  });

  it("latest", async () => {
    mock.graphql.query.mockResolvedValue({
      post: [postItem],
    });
    const plugin = post(mock);
    const result = await plugin.latest();

    expect(result).toStrictEqual([postItem]);
  });

  it("create", async () => {
    mock.rest.request.mockResolvedValue({
      ...postItem,
    });

    const plugin = post(mock);
    const result = await plugin.create(postItem);

    expect(result).toStrictEqual(postItem);
  });

  it("remove", async () => {
    const plugin = post(mock);
    await plugin.remove("some-item");
    expect(mock.rest.request).toHaveBeenCalledOnce();
  });
});
