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

export default function PendapatanLayout({ children }: PropsWithChildren) {
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
