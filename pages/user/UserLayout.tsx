import { Link, Outlet } from "react-router";

export function UserLayout() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Beranda</Link>
          <Link to="/user">Daftar User</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
