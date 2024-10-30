import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div>
      navigation
      {/* navigation here */}
      {children}
    </div>
  );
}
