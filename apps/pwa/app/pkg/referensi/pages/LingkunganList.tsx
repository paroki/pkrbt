import { LingkunganR } from "@pkrbt/directus";
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

export default function LingkunganList({ items }: { items: LingkunganR[] }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Lingkungan</CardTitle>
        <CardDescription>klik item untuk mengedit data</CardDescription>
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
                  navigate(`/referensi/lingkungan/${item.id}`);
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
        <CreateButton createUrl="/referensi/lingkungan/create" />
      </CardFooter>
    </Card>
  );
}
