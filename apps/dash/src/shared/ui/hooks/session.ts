import { useContext, useEffect } from "react";
import { SessionContext } from "../context";

export function useSession() {
  const context = useContext(SessionContext);
  return {
    ...context,
  };
}
