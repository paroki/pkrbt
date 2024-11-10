import DefaultLayout from "@/ui/layout/default";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@pkrbt/ui/shadcn/card";
import { PropsWithChildren } from "react";
import Nav from "./Nav";
import { ensurePengurusHarianDPP } from "@/common/user";

export default async function PendapatanLayout({
  children,
}: PropsWithChildren) {
  await ensurePengurusHarianDPP();
  return (
    <DefaultLayout>
      <Card>
        <CardHeader>
          <CardTitle>Pendapatan</CardTitle>
          <CardDescription>
            Pendapatan Paroki
            <span className="pt-2">
              <Nav />
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <hr />
          <div>{children}</div>
        </CardContent>
      </Card>
    </DefaultLayout>
  );
}
