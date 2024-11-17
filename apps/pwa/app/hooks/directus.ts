import { createDirectus } from "@pkrbt/directus";
import { useRootOutletContext } from "~/hooks/outlets";

export class ClientDirectusError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export function useDirectus() {
  const { directusUrl, directusToken } = useRootOutletContext();
  return createDirectus({
    baseUrl: directusUrl,
    token: directusToken,
  });
}
