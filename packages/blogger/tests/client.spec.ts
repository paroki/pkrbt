import { describe, expect, it, vi } from "vitest";
import { Client, ClientConfig } from "../src/client.js";

vi.mock("@googleapis/blogger", () => ({
  blogger_v3: {
    Blogger: vi.fn().mockImplementation(() => ({
      posts: {
        list: vi.fn(),
        get: vi.fn(),
        insert: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
      },
    })),
  },
}));

vi.mock("google-auth-library", () => ({
  OAuth2Client: vi.fn().mockImplementation(() => ({})),
}));

describe("Blogger Client", () => {
  const mockConfig = {
    apiKey: "some-key",
    accessToken: "testing",
    blogId: "12345",
  } satisfies ClientConfig;

  it("should initialize with config", () => {
    const client = new Client(mockConfig);
    expect(client).toBeInstanceOf(Client);
  });

  it("should get posts", async () => {
    const mockPosts = {
      items: [{ id: "1", title: "Test Post" }],
    };

    const client = new Client(mockConfig);
    const blogger = (client as any).blogger;
    blogger.posts.list.mockResolvedValue({ data: mockPosts });

    const result = await client.getPosts();
    expect(result).toEqual(mockPosts);
    expect(blogger.posts.list).toHaveBeenCalledWith({
      blogId: mockConfig.blogId,
    });
  });

  it("should get a single post", async () => {
    const mockPost = { id: "1", title: "Test Post" };

    const client = new Client(mockConfig);
    const blogger = (client as any).blogger;
    blogger.posts.get.mockResolvedValue({ data: mockPost });

    const result = await client.getPost("1");
    expect(result).toEqual(mockPost);
    expect(blogger.posts.get).toHaveBeenCalledWith({
      blogId: mockConfig.blogId,
      postId: "1",
    });
  });

  it("should create a post", async () => {
    const mockPost = {
      title: "New Post",
      content: "Post content",
    };

    const client = new Client(mockConfig);
    const blogger = (client as any).blogger;
    blogger.posts.insert.mockResolvedValue({ data: { ...mockPost, id: "1" } });

    const result = await client.createPost(mockPost);
    expect(result).toEqual({ ...mockPost, id: "1" });
    expect(blogger.posts.insert).toHaveBeenCalledWith({
      blogId: mockConfig.blogId,
      requestBody: {
        kind: "blogger#post",
        blog: { id: mockConfig.blogId },
        title: mockPost.title,
        content: mockPost.content,
        status: "LIVE",
      },
    });
  });
});
