import { PropsWithChildren } from "react";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <div>
      Layout Login
      <div>{children}</div>
    </div>
  );
}
