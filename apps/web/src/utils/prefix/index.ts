export function addPrefix(path?: string): string {
  const url = process.env.DIRECTUS_URL;

  if (!path) {
    return "";
  }
  const isPrefixed = /^(https?:\/\/)/;

  return isPrefixed.test(path) ? path : `${url}${path}`;
}
