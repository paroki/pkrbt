/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createDirectus,
  DirectusClient,
  graphql,
  GraphqlClient,
  rest,
  RestClient,
  staticToken,
} from "@directus/sdk";
import {
  Constructor,
  DirectusOptions,
  DirectusPlugin,
  ReturnTypeOf,
  UnionToIntersection,
} from "./types";

export * from "./types";

export class Directus<T> {
  static defaults<S extends Constructor<any>>(
    this: S,
    defaults: DirectusOptions | Function,
  ) {
    const DirectusWithDefaults = class extends this {
      constructor(...args: any[]) {
        const options = args[0] || {};

        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }

        super(Object.assign({}, defaults, options));
      }
    };

    return DirectusWithDefaults as typeof this;
  }

  static plugins: DirectusPlugin[] = [];

  /**
   * Attach a plugin (or many) to your Directus instance.
   *
   * @example
   * const API = Directus.plugin(plugin1, plugin2, plugin3, ...)
   */
  static plugin<
    S extends Constructor<any> & { plugins: any[] },
    T extends DirectusPlugin[],
  >(this: S, ...newPlugins: T) {
    const currentPlugins = this.plugins;
    const NewDirectus = class extends this {
      static plugins = currentPlugins.concat(
        newPlugins.filter((plugin) => !currentPlugins.includes(plugin)),
      );
    };

    return NewDirectus as typeof this &
      Constructor<UnionToIntersection<ReturnTypeOf<T>>>;
  }

  client: DirectusClient<T>;
  rest: typeof this.client & RestClient<T>;
  graphql: typeof this.client & GraphqlClient<T>;

  constructor(options: DirectusOptions) {
    this.client = createDirectus<T>(options.baseUrl);
    if (options.token) {
      this.client = this.client.with(staticToken(options.token));
    }

    this.rest = this.client.with(rest());
    this.graphql = this.client.with(graphql());

    // apply plugins
    // https://stackoverflow.com/a/16345172
    const classConstructor = this.constructor as typeof Directus;
    if (classConstructor.plugins.length > 0) {
      for (let i = 0; i < classConstructor.plugins.length; ++i) {
        const plugin = classConstructor.plugins[i];
        if (plugin) {
          Object.assign(this, plugin(this, options));
        }
      }
    }
  }
}
