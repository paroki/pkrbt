import { PendapatanR } from "@pkrbt/directus";
import { Link } from "@remix-run/react";
import { LucidePencil, LucidePlusCircle } from "lucide-react";
import moment from "moment/min/moment-with-locales";
import { cn, toLocalDate, toMoney } from "~/common/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/shadcn/avatar";
import { Button } from "~/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Separator } from "~/components/shadcn/separator";
import { useRootOutletContext } from "~/hooks/outlets";

function PendapatanList({ items }: { items: PendapatanR[] }) {
  moment.locale("id");
  const { directusUrl } = useRootOutletContext();
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={cn(
          "flex flex-row flex-wrap gap-4 w-full",
          "items-stretch justify-center",
        )}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col p-2 max-w-sm",
              "border bg-white rounded-md drop-shadow-md",
            )}
          >
            <div className="flex flex-row items-center gap-x-2">
              <span>
                <Avatar className="w-16 h-16 border">
                  {item.createdBy && item.createdBy.avatar && (
                    <AvatarImage
                      src={`${directusUrl}/assets/${item.createdBy.avatar}`}
                    />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {toLocalDate(item.tanggal, "dddd, DD MMMM YYYY")}
                </span>
                <span className="font-bold">
                  {item.sumber.sumber}
                  {", "}
                  {item.uraian ?? "N/A"}
                </span>
                <span className="text-xs text-primary/80">
                  {`oleh ${item.createdBy.nama}, ${moment(item.createdAt).format("dddd DD MMMM YYYY")}`}
                </span>
              </div>
            </div>
            <Separator className="my-2" />
            <div className={cn("flex gap-x-4")}>
              <span>Jumlah</span>
              <span className="border-y-2 border-y-green-600">
                {item.jumlah ? toMoney(item.jumlah) : "N/A"}
              </span>
              <span className="flex-grow">&nbsp;</span>
            </div>
            <div className={cn("flex gap-x-4")}>
              <span>Catatan</span>
              <p>{item.catatan ?? "-"}</p>
            </div>
            {item.updatedBy && (
              <div
                className={cn("flex flex-row gap-2 items-center text-sm p-2")}
              >
                <span>
                  <Avatar className="w-10 h-10 border">
                    {item.updatedBy && item.updatedBy.avatar && (
                      <AvatarImage
                        src={`${directusUrl}/assets/${item.updatedBy.avatar}`}
                      />
                    )}

                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </span>
                <p className="text-xs text-primary/90">
                  {`diupdate oleh ${item.updatedBy.nama ? item.updatedBy.nama : "N/A"}`}
                  <br />
                  {item.updatedAt &&
                    `${item.updatedAt && " pada " + moment(item.updatedAt).format("dddd, DD MMMM YYYY hh:mm:ss")}`}
                </p>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex flex-row">
              <Button asChild size={"sm"} className="text-xs">
                <Link to={`/pendapatan/${item.id}`}>
                  <LucidePencil />
                  Edit
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function HarianList({ items }: { items: PendapatanR[] }) {
  return (
    <div className="flex flex-col w-full mb-16">
      {items.length > 0 ? (
        <PendapatanList items={items} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Data tidak ditemukan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Data pendapatan harian tidak ditemukan!</p>
          </CardContent>
        </Card>
      )}

      <div
        className={cn(
          "fixed bottom-0 left-0 z-50 bg-white flex w-full mt-4",
          "items-center justify-center",
          "border",
        )}
      >
        <div className="flex flex-row px-4 py-2 gap-x-2">
          <Button asChild size={"icon"}>
            <Link to="/pendapatan/harian/create">
              <LucidePlusCircle />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
