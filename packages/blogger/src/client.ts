import { blogger_v3 } from "@googleapis/blogger";
import { OAuth2Client } from "google-auth-library";

export interface ClientConfig {
  blogId: string;
  apiKey: string;
  accessToken?: string;
}

export class Client {
  private blogger: blogger_v3.Blogger;
  private blogId: string;

  constructor(config: ClientConfig) {
    this.blogId = config.blogId;
    const authClient = config.accessToken
      ? new OAuth2Client({ credentials: { access_token: config.accessToken } })
      : config.apiKey;

    this.blogger = new blogger_v3.Blogger({ auth: authClient });
  }

  async getPosts(options: { maxResults?: number; pageToken?: string } = {}) {
    const response = await this.blogger.posts.list({
      blogId: this.blogId,
      ...options,
    });

    return response.data;
  }

  async getPost(postId: string) {
    const response = await this.blogger.posts.get({
      blogId: this.blogId,
      postId,
    });

    return response.data;
  }

  async createPost(post: {
    title: string;
    content: string;
    labels?: string[];
    isDraft?: boolean;
  }) {
    const response = await this.blogger.posts.insert({
      blogId: this.blogId,
      requestBody: {
        kind: "blogger#post",
        blog: { id: this.blogId },
        title: post.title,
        content: post.content,
        labels: post.labels,
        status: post.isDraft ? "DRAFT" : "LIVE",
      },
    });

    return response.data;
  }

  async updatePost(
    postId: string,
    post: {
      title?: string;
      content?: string;
      labels?: string[];
      isDraft?: boolean;
    },
  ) {
    const response = await this.blogger.posts.patch({
      blogId: this.blogId,
      postId,
      requestBody: {
        ...(post.title && { title: post.title }),
        ...(post.content && { content: post.content }),
        ...(post.labels && { labels: post.labels }),
        ...(post.isDraft !== undefined && {
          status: post.isDraft ? "DRAFT" : "LIVE",
        }),
      },
    });

    return response.data;
  }

  async deletePost(postId: string) {
    await this.blogger.posts.delete({
      blogId: this.blogId,
      postId,
    });
  }
}
