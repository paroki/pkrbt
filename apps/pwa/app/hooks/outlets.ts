import { useOutletContext } from "@remix-run/react";
import { RootOutletContext } from "~/root";

export function useRootOutletContext() {
  return useOutletContext<RootOutletContext>();
}
