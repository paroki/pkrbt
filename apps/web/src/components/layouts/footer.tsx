"use client";

import * as React from "react";
import Container from "../ui/container";
import Info from "../info";
import Link from "next/link";

const VERSION = process.env.NEXT_PUBLIC_VERSION;

export function Footer() {
  return (
    <>
      <Container className="bg-white">
        <div className="max-w-screen-lg mx-auto ">
          <Info />
        </div>
      </Container>
      <footer className="text-center p-10 bg-gray-800 text-primary-600 flex flex-col">
        <Link href="https://github.com/paroki/pkrbt">
          PKRBT Website versi: <strong>{VERSION}</strong>
        </Link>
        <Link href="https://github.com/orgs/paroki/people">
          &copy; 2024 PKRBT Developers
        </Link>
      </footer>
    </>
  );
}
