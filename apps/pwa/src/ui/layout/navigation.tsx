import { MenuItem } from "@/common/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  menus: MenuItem[];
};

export default function Navigation({}: Props) {
  const logo = {
    url: "https://api.pkrbt.id/assets/baf5b5fb-12fd-43c3-aa34-b6a3d06ac8d1",
    width: 512,
    height: 512,
  };
  return (
    <div className="sticky top-0 bg-white z-50 flex items-center md:block justify-between w-full shadow py-1">
      <nav className="flex max-w-screen-lg mx-auto">
        <Link href="/" className="flex items-center gap-2 ml-2 lg:ml-0">
          <Image
            src={logo.url}
            width={logo.width}
            height={logo.height}
            alt="logo"
            sizes="(max-width: 32px max-height: 32px) 100vw"
            quality={100}
            style={{
              width: 32,
              height: 32,
              objectFit: "cover",
            }}
          />
          <h1 className="text-xl font-bold">PKRBT</h1>
        </Link>
      </nav>
    </div>
  );
}
