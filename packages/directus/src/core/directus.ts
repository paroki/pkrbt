import {
  createDirectus,
  graphql,
  GraphqlClient,
  rest,
  RestClient,
  staticToken,
  type DirectusClient,
} from "@directus/sdk";
import { Schema } from "../types";
import {
  Constructor,
  DirectusOptions,
  DirectusPlugin,
  ReturnTypeOf,
  UnionToIntersection,
} from "./types";

export class Directus {
  static defaults<S extends Constructor<any>>(
    this: S,
    defaults: Partial<DirectusOptions> | Function,
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

  directus: DirectusClient<Schema>;
  rest: DirectusClient<Schema> & RestClient<Schema>;
  graphql: DirectusClient<Schema> & GraphqlClient<Schema>;
  options: DirectusOptions;

  constructor(options: DirectusOptions) {
    this.directus = createDirectus<Schema>(
      options.endpoint,
      options.clientOptions,
    );

    if (options.token) {
      this.directus = this.directus.with(staticToken(options.token));
    }

    this.graphql = this.directus.with(graphql());
    this.rest = this.directus.with(rest());
    this.options = options;

    // apply plugins
    // https://stackoverflow.com/a/16345172
    const classConstructor = this.constructor as typeof Directus;
    for (let i = 0; i < classConstructor.plugins.length; ++i) {
      // @ts-ignore
      Object.assign(this, classConstructor.plugins[i](this, options));
    }
  }
}
