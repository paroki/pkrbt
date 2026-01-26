import { authClient, BetterFetchError } from "@pkrbt/auth/client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type SessionType = {
  session?: typeof authClient.$Infer.Session.session;
  user?: typeof authClient.$Infer.Session.user;
  isPending: boolean;
  error: BetterFetchError | null;
};

export const SessionContext = createContext<SessionType | undefined>(undefined);

export function SessionProvider({ children }: {} & PropsWithChildren) {
  const { data, isPending, error } = authClient.useSession();
  const [user, setUser] = useState(data?.user);
  const [session, setSession] = useState(data?.session);

  useEffect(() => {
    setUser(data?.user);
    setSession(data?.session);
  }, [data]);
  return (
    <SessionContext.Provider value={{ user, session, isPending, error }}>
      {children}
    </SessionContext.Provider>
  );
}
