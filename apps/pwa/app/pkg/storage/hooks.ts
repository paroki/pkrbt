import { useRootOutletContext } from "~/hooks/outlets";

export function useStorage() {
  const { directusUrl } = useRootOutletContext();

  function assetUrl(id: string) {
    return `${directusUrl}/assets/${id}`;
  }

  return { assetUrl };
}
