"use client";

import Container from "@/components/ui/container";
import Info from "@/components/layouts/info";
import Link from "next/link";
import { VERSION } from "@/utils/config";

export function Footer() {
  return (
    <>
      <Container className="bg-white">
        <div className="max-w-screen-lg mx-auto ">
          <Info />
        </div>
      </Container>
      <footer className="text-center p-2 bg-gray-800 text-primary-600 flex flex-col text-sm">
        <Link href="https://github.com/paroki/pkrbt/releases">
          PKRBT website versi <strong>{VERSION}</strong>
        </Link>
        <Link href="https://github.com/paroki/pkrbt">
          &copy; 2024 PKRBT Developers
        </Link>
      </footer>
    </>
  );
}
