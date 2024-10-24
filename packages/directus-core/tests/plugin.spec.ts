import { describe, expect, it } from "vitest";
import { Directus } from "../src";

const pluginFoo = () => {
  return {
    foo: "foo",
  };
};

const pluginBar = () => {
  return { bar: "bar" };
};

const options = {
  baseUrl: "http://localhost:8055",
};

describe("Directus.plugin()", () => {
  it("gets called in constructor", () => {
    const MyDirectus = Directus.plugin(pluginFoo);
    const api = new MyDirectus(options);
    expect(api.foo).toEqual("foo");
  });

  it("supports multiple plugins", () => {
    const MyDirectus = Directus.plugin(pluginFoo, pluginBar);
    const client = new MyDirectus(options);

    expect(client.foo).toEqual("foo");
    expect(client.bar).toEqual("bar");
  });

  it("does not override plugins of original constructor", () => {
    const MyDirectus = Directus.plugin(pluginFoo);
    const client = new MyDirectus(options);
    expect(client.foo).toEqual("foo");

    const directus = new Directus(options);
    expect(directus).not.toHaveProperty("foo");
  });
});
