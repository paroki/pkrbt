import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/shadcn/tabs";

import { Suspense } from "react";
import { Await, Link } from "@remix-run/react";
import { KegiatanR } from "@pkrbt/directus";
import { Skeleton } from "~/components/shadcn/skeleton";
import _ from "lodash";
import { CogIcon, LucideCalendar1, UserCog2Icon } from "lucide-react";
import KegiatanStacked from "~/pkg/kegiatan/components/KegiatanStacked";
import { Button } from "~/components/shadcn/button";

type Props = {
  kegiatan: Promise<KegiatanR[]>;
};

function KegiatanSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      {_.times(3, (i) => (
        <div
          key={i}
          className="bg-white flex w-full items-center space-x-4 border rounded-md drop-shadow-md p-4"
        >
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard({ kegiatan }: Props) {
  return (
    <Tabs defaultValue="kegiatan" className="w-full">
      <TabsList className="grid grid-cols-2 drop-shadow-md border h-full">
        <TabsTrigger id="kegiatan" value="kegiatan" className="space-x-2">
          <LucideCalendar1 />
          <span>Kegiatan</span>
        </TabsTrigger>
        <TabsTrigger id="layanan" value="layanan" className="space-x-2">
          <CogIcon />
          <span>Layanan</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="kegiatan">
        <Suspense fallback={<KegiatanSkeleton />}>
          <Await resolve={kegiatan}>
            {(kegiatan) => <KegiatanStacked kegiatan={kegiatan} />}
          </Await>
        </Suspense>
      </TabsContent>
      <TabsContent value="layanan">
        <div className="flex bg-white rounded-md drop-shadow-md border p-2 gap-x-2 gap-y-2">
          <Button asChild variant={"default"}>
            <Link to="/user/avatar" className="w-20 h-20 flex-col">
              <UserCog2Icon />
              foto
            </Link>
          </Button>
          <Button asChild variant={"default"}>
            <Link to="/user/biodata" className="w-20 h-20 flex-col">
              <UserCog2Icon />
              biodata
            </Link>
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
