"use client";

import Link from "next/link";
import { FacebookCircle, Instagram, Youtube } from "@/components/icons/socials";

export default function SocialMedia() {
  return (
    <ul className="flex justify-center gap-5">
      <li>
        <Link
          href="https://www.instagram.com/gkrbt1937"
          className="p-2 text-primary-50 rounded-full bg-primary-400 block"
        >
          <Instagram />
        </Link>
      </li>
      <li>
        <Link
          href="https://www.facebook.com/kristus.raja"
          className="p-2 text-primary-50 rounded-full bg-primary-400 block"
        >
          <FacebookCircle />
        </Link>
      </li>
      <li>
        <Link
          href="https://www.youtube.com/@gkrbt"
          className="p-2 text-primary-50 rounded-full bg-primary-400 block"
        >
          <Youtube />
        </Link>
      </li>
    </ul>
  );
}
