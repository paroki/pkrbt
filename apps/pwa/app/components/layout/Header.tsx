import { Link } from "@remix-run/react";

export default function Header() {
  const logo = {
    url: "https://api.pkrbt.id/assets/baf5b5fb-12fd-43c3-aa34-b6a3d06ac8d1",
    width: 512,
    height: 512,
  };
  return (
    <div className="sticky top-0 bg-white z-50 flex items-center md:block justify-between w-full shadow py-2 px-2">
      <nav className="flex max-w-screen mx-auto items-center gap-x-2">
        <Link
          to="/dashboard/kegiatan"
          className="flex items-center gap-2 ml-2 lg:ml-0"
        >
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
      </nav>
    </div>
  );
}
