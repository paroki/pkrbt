import { DIRECTUS_URL } from "../config";

export function addPrefix(path?: string): string {
  if (!path) {
    return "";
  }
  const isPrefixed = /^(https?:\/\/)/;

  return isPrefixed.test(path) ? path : `${DIRECTUS_URL}${path}`;
}
