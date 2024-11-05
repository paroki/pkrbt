import { formatMoney } from "@/common/utils";
import { PendapatanR } from "@pkrbt/directus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pkrbt/ui/shadcn/table";

type Props = {
  items: PendapatanR[];
};

export default function PendapatanTable({ items }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Uraian</TableHead>
          <TableHead>Sumber</TableHead>
          <TableHead>Jumlah</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.tanggal}</TableCell>
            <TableCell>{item.uraian}</TableCell>
            <TableCell>{item.sumber.sumber}</TableCell>
            <TableCell>{formatMoney(item.jumlah)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
