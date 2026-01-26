import { useContext, useState } from "react";
import { LayoutContext } from "../context/layout";

export function useLayout() {
  const context = useContext(LayoutContext);

  return {
    ...context,
  };
}
