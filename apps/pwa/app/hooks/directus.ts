import { createDirectus, rest, staticToken } from "@directus/sdk";
import { Schema } from "@pkrbt/directus";
import { useRootOutletContext } from "~/hooks/outlets";

export class ClientDirectusError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export function useDirectus() {
  const { directusUrl, directusToken } = useRootOutletContext();
  return (
    createDirectus<Schema>(directusUrl)
      //.with(authentication("session", { credentials: "include" }))
      .with(staticToken(directusToken))
      .with(rest())
  );
}
