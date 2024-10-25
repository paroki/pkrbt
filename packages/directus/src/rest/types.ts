/* eslint-disable @typescript-eslint/no-explicit-any */

import { Schema } from "..";

/**
 * Flatten array types to their singular root
 */
export type UnpackList<Item> = Item extends any[] ? Item[number] : Item;

export type RestCollection = keyof Schema;

/**
 * Partial rest item
 */
export type RestItemPartial = Partial<UnpackList<Schema[RestCollection]>>;

export type RestResponse<T> = {
  error?: Error;
  item?: T;
};

export type RestFiltersParams = {
  filter?: {
    [key: string]: any;
  };
  search?: string;
};

export type RestFindIdType = {
  id?: string | number;
  error?: Error;
};
