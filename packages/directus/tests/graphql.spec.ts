import { Directus } from "@pkrbt/directus-core";
import { beforeEach, describe, expect, it } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { Graphql, GraphqlOptions, Post, Schema } from "../src";

const directus = mockDeep<Directus<Schema>>();
const options: GraphqlOptions = {
  directus,
  type: "post",
  fields: `
id
title
category
`,
};
const postItem = {
  title: "Test",
};

describe("graphql", () => {
  beforeEach(() => {
    mockReset(directus);
  });

  it("addParam() should set default parameter value", () => {
    const gql = new Graphql(options);

    gql.addParam({
      name: "test",
      type: "Int",
    });

    const param = gql.params.test;
    expect(param).toBeDefined();
    expect(param?.name).toBe("test");
    expect(param?.type).toBe("Int");
    expect(param?.required).toBeTruthy();
    expect(param?.variableName).toBe("$test");
    expect(param?.argumentName).toBe("test");
  });

  it("addParam() should not override passed parameter value", () => {
    const gql = new Graphql(options);

    gql.addParam({
      name: "keyword",
      type: "Int",
      argumentName: "search",
    });

    const param = gql.params.keyword;
    expect(param).toBeDefined();
    expect(param?.variableName).toBe("$keyword");
    expect(param?.argumentName).toBe("search");
  });

  it("execute() should create graphql requests", async () => {
    const fragment = `
id
title
category {
  id
}
`;
    const fields = `
...searchFragment
`;

    const gql = new Graphql({
      ...options,
      fields,
    });

    const expectedQuery = `
fragment searchFragment on post {
  id
  title
  category {
    id
  }
}

query post(
  $page: Int!,
  $limit: Int!
){
  post(
    page: $page,
    limit: $limit
  ){
    ...searchFragment
  }
}`;
    directus.graphql.query.mockResolvedValue({
      post: [postItem],
    });
    gql.setFragment({
      name: "searchFragment",
      content: fragment,
    });

    gql.addParam({ name: "page", type: "Int" });
    gql.addParam({ name: "limit", type: "Int" });

    const result = await gql.execute({});

    expect(directus.graphql.query).toHaveBeenCalled();
    expect(directus.graphql.query).toHaveBeenCalledWith(expectedQuery, {});
    expect(result.data).toStrictEqual([postItem]);
  });

  it("paginate() should create response with page meta", async () => {
    const gql = new Graphql(options);

    directus.graphql.query.mockResolvedValue({
      post: [postItem],
      post_aggregated: [
        {
          count: {
            id: 32,
          },
        },
      ],
    });

    gql.addParam({ name: "keyword", type: "String", argumentName: "search" });

    const { items, meta, error } = await gql.paginate<Post>({
      page: 1,
      limit: 10,
    });

    expect(directus.graphql.query).toHaveBeenCalledTimes(2);
    expect(error).toBeUndefined();
    expect(items).toBeDefined();
    expect(items).toStrictEqual([postItem]);
    expect(meta).toBeDefined();
    expect(meta).toStrictEqual({
      page: 1,
      pageSize: 3,
      nextPage: 2,
      previousPage: 1,
      rows: 32,
    });
  });
});
