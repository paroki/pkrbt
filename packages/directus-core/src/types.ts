/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Directus } from "./index.js";

export interface DirectusOptions {
  baseUrl: string;
  token?: string;
}

export type Constructor<T> = new (...args: any[]) => T;

type AnyFunction = (...args: any) => any;

export type DirectusPlugin = (
  directus: Directus<any>,
  options: DirectusOptions,
) => { [key: string]: any } | void;

/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
export type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void // tslint:disable-line: no-unused
  ? Intersection
  : never;

export type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> =
  T extends AnyFunction
    ? ReturnType<T>
    : T extends AnyFunction[]
      ? // exclude `void` from intersection, see octokit/octokit.js#2115
        UnionToIntersection<Exclude<ReturnType<T[number]>, void>>
      : never;
