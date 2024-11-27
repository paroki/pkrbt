import { WilayahR } from "@pkrbt/directus";
import { useNavigate } from "@remix-run/react";
import BackButton from "~/components/buttons/BackButton";
import CreateButton from "~/components/buttons/CreateButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/shadcn/table";

export default function WilayahList({ items }: { items: WilayahR[] }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Wilayah</CardTitle>
        <CardDescription>klik item untuk mengedit data wilayah</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="rounded-md border max-w-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] text-center">NO</TableHead>
              <TableHead>Nama Stasi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={`wilayah-list-${item.id}`}
                className="cursor-pointer"
                onClick={() => {
                  console.log("clicked", item.nama);
                  navigate(`/referensi/wilayah/${item.id}`);
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <BackButton to="/referensi" />
        <CreateButton createUrl="/referensi/wilayah/create" />
      </CardFooter>
    </Card>
  );
}
