import { Directus } from "@pkrbt/directus-core";
import {
  GraphqlExecParams,
  GraphqlExecResponse,
  GraphqlFragment,
  GraphqlOptions,
  GraphqlPaginateMeta,
  GraphqlPaginateParams,
  GraphqlPaginateResponse,
  GraphqlParam,
} from "./types";
import { Schema } from "..";
import { GraphqlError } from "./error";

export class Graphql {
  fragment?: GraphqlFragment;
  fields: string;
  params: {
    [key: string]: GraphqlParam;
  } = {};
  directus: Directus<Schema>;
  type: string;

  constructor(options: GraphqlOptions) {
    this.directus = options.directus;
    this.type = options.type;
    this.fields = options.fields;
    this.fragment = options.fragment;
  }

  addParam(
    param: Omit<GraphqlParam, "variableName" | "argumentName" | "required"> &
      Pick<Partial<GraphqlParam>, "variableName" | "argumentName" | "required">,
  ) {
    const { name } = param;
    const withDefaults: GraphqlParam = {
      variableName: `$${name}`,
      argumentName: name,
      required: true,
      ...param,
    };

    this.params[name] = withDefaults;

    return this;
  }

  setFragment(fragment: GraphqlFragment) {
    this.fragment = fragment;
    return this;
  }

  async execute<T>(
    params?: GraphqlExecParams,
  ): Promise<GraphqlExecResponse<T>> {
    let data;
    let error;
    const query = this.createQuery();
    const graphql = this.directus.graphql;

    /*
    if (params && Object.keys(params).includes("filter")) {
      const stringify = JSON.stringify(params.filter).replace(
        /"([^"]+)":/g,
        "$1:",
      );
      query = query.replace("%filter%", `filter: ${stringify}`);
      console.log(query);
    }
    */

    try {
      const response = await graphql.query(query, params);
      data = response[this.type];
    } catch (e) {
      error = new GraphqlError(query, e);
    }

    return {
      data: data as T,
      error,
    };
  }

  async paginate<T>(
    params: GraphqlPaginateParams,
  ): Promise<GraphqlPaginateResponse<T>> {
    let error;
    let items: T[] = [];
    let meta;

    try {
      meta = await this.createPageMeta(params);
    } catch (e) {
      error = new Error("Unknown error", { cause: e });
      if (e instanceof Error) {
        error = e;
      }
      return { meta, error, items };
    }

    this.addParam({ name: "page", type: "Int" });
    this.addParam({ name: "limit", type: "Int" });
    try {
      const { data, error: execError } = await this.execute<T[]>(params);
      error = execError;
      items = data ?? [];
    } catch (e) {
      error = new GraphqlError("", { cause: e });
      if (e instanceof Error) {
        error = e;
      }
    }

    return {
      items,
      meta,
      error,
    };
  }
  private async createPageMeta(
    params: GraphqlPaginateParams,
  ): Promise<GraphqlPaginateMeta> {
    const template = `
query ${this.type}_aggregated(
  %vars%
){
  ${this.type}_aggregated(
    %args%
  ){
    count {
      id
    }
  }
}
`;
    const page = params.page;
    const limit = params.limit;
    const query = this.renderParam(template, ["sort", "page", "limit"]).replace(
      /\(\s+\)/gim,
      "",
    );

    try {
      const { post_aggregated } = await this.directus.graphql.query(
        query,
        params,
      );
      const count = post_aggregated[0].count.id;
      const size: number = Number((count / limit).toFixed(0));
      return {
        page,
        pageSize: size,
        rows: count,
        nextPage: page < size ? page + 1 : page,
        previousPage: page > 1 ? page - 1 : page,
      };
    } catch (e) {
      throw new GraphqlError(query, e);
    }
  }

  private createQuery() {
    let output = "";

    if (this.fragment) {
      const fragments = this.fragment.content.split("\n").join("\n  ").trim();
      output += `
fragment ${this.fragment.name} on ${this.type.split("_")[0]} {
  ${fragments}
}
`;
    }

    const template = `
query ${this.type}(
  %vars%
){
  ${this.type}(
    %args%
  ){
    %fields%
  }
}`;
    output += this.renderParam(template).replace(
      "%fields%",
      this.fields.trim().split("\n").join("\n    "),
    );

    return output;
  }

  private renderParam(template: string, filters: string[] = []) {
    const vars: string[] = [];
    const args: string[] = [];

    Object.entries(this.params).forEach((entry) => {
      const definition = entry[1];
      const { name, type, required, argumentName, variableName } = definition;
      const rtype = required && type !== "[String!]!" ? `${type}!` : type;

      if (!filters.includes(name)) {
        vars.push(`${variableName}: ${rtype}`);
        args.push(`${argumentName}: ${variableName}`);
      }
    });

    return template
      .replace("%vars%", vars.join(",\n  "))
      .replace("%args%", args.join(",\n    "))
      .replace(/\(\s+\)/gim, "");
  }
}
