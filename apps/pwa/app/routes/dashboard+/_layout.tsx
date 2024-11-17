import { Outlet, useOutletContext } from "@remix-run/react";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { RootOutletContext } from "~/root";

export default function Page() {
  const context = useOutletContext<RootOutletContext>();

  return (
    <DefaultLayout>
      <Outlet context={{ ...context }} />
    </DefaultLayout>
  );
}
