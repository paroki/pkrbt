import { Link } from "@remix-run/react";
import { LucideMap, MapPinHouse } from "lucide-react";
import { Button } from "~/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";

const menus = [
  {
    title: "Stasi",
    href: "/referensi/wilayah",
    icon: LucideMap,
  },
  {
    title: "Lingkungan",
    href: "/referensi/lingkungan",
    icon: MapPinHouse,
  },
];

export default function Referensi() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Data Referensi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row w-full h-full max-w-sm gap-4 items-start">
          {menus.map((item, index) => (
            <Button
              key={`menu-referensi-${index}`}
              asChild
              className="grow basis-1 h-full max-w-[116px]"
            >
              <Link to={item.href} className="flex flex-col text-xs">
                <item.icon style={{ width: "24px", height: "24px" }} />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
