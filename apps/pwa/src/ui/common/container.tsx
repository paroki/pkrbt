import React, { PropsWithChildren } from "react";

type ContainerType = PropsWithChildren & {
  className?: string;
};

export default function Container({ children, className }: ContainerType) {
  return <div className={`mx-auto ${className} p-6`}>{children}</div>;
}
