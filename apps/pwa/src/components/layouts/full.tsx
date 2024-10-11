import { PropsWithChildren } from "react";

export default function LayoutFull({ children }: PropsWithChildren) {
  return (
    <div>
      Full Layout<div>{children}</div>
    </div>
  );
}
