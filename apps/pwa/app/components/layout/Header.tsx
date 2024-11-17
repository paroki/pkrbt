import { Link, useLocation } from "@remix-run/react";
import { mainMenu } from "~/common/menu";
import { cn } from "~/common/utils";

export default function Header() {
  const location = useLocation();

  const logo = {
    url: "https://api.pkrbt.id/assets/baf5b5fb-12fd-43c3-aa34-b6a3d06ac8d1",
    width: 512,
    height: 512,
  };

  function isActive(route: string) {
    if (route.includes("kegiatan")) {
      return location.pathname.includes(route);
    }
    return !location.pathname.includes("/dashboard/kegiatan");
  }

  return (
    <div className="sticky top-0 bg-white z-50 h-10 flex justify-center w-full shadow">
      <nav className="flex flex-row w-full items-center">
        <div>
          <Link to="/dashboard/kegiatan" className="flex gap-2 ml-2 mr-2">
            <img
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt="logo"
              style={{
                width: 32,
                height: 32,
                objectFit: "cover",
              }}
            />
            <h1 className="text-xl font-bold">PKRBT</h1>
          </Link>
        </div>
        <ul className="flex flex-row items-center justify-center gap-2 m-0 p-0">
          {mainMenu.map((menu, index) => (
            <li
              key={index}
              className={cn(
                isActive(menu.route)
                  ? "text-primary border-b-2 border-b-blue-800"
                  : "text-gray-500",
              )}
            >
              <Link to={menu.route}>
                <menu.icon />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
