"use client";

import React from "react";

interface ContainerHeaderType {
  children: React.ReactNode;
  size?: string;
  className?: string;
}

export default function ContainerHeader({
  children,
  size,
  className,
}: ContainerHeaderType) {
  return (
    <h3
      className={`${size === "smaller" ? "text-sm" : "text-xl"} uppercase tracking-widest mb-2 ${className}`}
    >
      {children}
    </h3>
  );
}
