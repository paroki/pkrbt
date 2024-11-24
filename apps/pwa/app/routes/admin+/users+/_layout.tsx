import { Outlet } from "@remix-run/react";
import { useRootOutletContext } from "~/hooks/outlets";

export default function Layout() {
  const context = useRootOutletContext();
  return <Outlet context={context} />;
}
