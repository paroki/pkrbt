"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { useLayout } from "../hooks";

export default function Container({
  title,
  children,
}: { title: string } & PropsWithChildren) {
  const { setTitle } = useLayout();
  useEffect(() => {
    if (setTitle) {
      setTitle(title);
    }
  }, [setTitle]);
  return <div>{children}</div>;
}
