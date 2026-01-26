import invariant from "tiny-invariant";
import z from "zod";
import { ZodError } from "zod";

z.config(z.locales.id());

export { invariant, z, ZodError };
export * from "./singleton";
