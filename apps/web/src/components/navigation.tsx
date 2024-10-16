"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  interface MenuItems {
    name: string;
    path: string;
    children?: MenuItems[];
  }

  const menus: MenuItems[] = [
    {
      name: "Beranda",
      path: "/",
    },
    {
      name: "Warta Gereja",
      path: "/berita",
    },
    {
      name: "DPP",
      path: "/dpp",
    },
    /*
    {
      name: "Sejarah",
      path: "/sejarah",
    },
    {
      name: "Formulir",
      path: "/formulir",
    },
    {
      name: "Dropdown",
      path: "#",
      children: [
        {
          name: "Drop 1",
          path: "#",
        },
        {
          name: "Drop 2",
          path: "#",
        },
      ],
    },
    */
  ];

  const containerNav = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleVisibility = (): void => {
    const containerEl = containerNav.current;
    containerEl?.className.includes("show")
      ? containerEl.classList.remove("show")
      : containerEl?.classList.add("show");
  };
  return (
    <div className="sticky top-0 bg-white shadow-sm z-50 md:border-b flex items-center md:block justify-between w-full">
      <nav className="flex max-w-screen-lg mx-auto ">
        <div>
          <Link href="/" className="flex items-center gap-4 p-4">
            <Image src="/logo.png" width="50" height="50" alt="logo"></Image>
            <h1 className="pt-3 text-xl ">PKRBT</h1>
          </Link>
        </div>
        <div className="container-nav relative " ref={containerNav}>
          <div className="absolute w-full top-4 block md:hidden">
            <button
              className="p-3 hover:bg-primary-300 rounded-full active:scale-110 active:bg-primary-400"
              onClick={toggleVisibility}
            >
              <X className="text-center w-9 h-9" />
            </button>
          </div>
          <ul className="main-nav">
            {menus.map((menu, index) =>
              (menu.children?.length ?? 0 > 0) ? (
                <li className="parent-nav" key={index}>
                  <Link href="#">
                    <span>{menu.name}</span>{" "}
                    <LucideChevronDown className="inline w-4 h-4" />
                  </Link>
                  <ul className="subnav">
                    {menu.children?.map((submenu, subindex) => (
                      <li key={subindex}>
                        <Link
                          onClick={() => {
                            toggleVisibility();
                          }}
                          href={submenu.path}
                        >
                          {submenu.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    onClick={() => {
                      toggleVisibility();
                    }}
                    href={menu.path}
                    className={`${pathname === menu.path ? "link-active" : ""}`}
                  >
                    {menu.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </nav>
      <div className="flex w-full justify-end md:hidden p-2 px-8">
        <button
          className="p-3 hover:bg-gray-50 rounded-full active:scale-110 active:bg-gray-100"
          onClick={toggleVisibility}
        >
          <Menu className="text-center w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
