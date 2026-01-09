import { type ColumnDef } from "@tanstack/react-table";
import type { User } from "shared/types";
import { DataTable, DataTableCellNav, DataTableColumnHeader } from "shared/ui";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header="Nama" />
    ),
    enableMultiSort: false,
    cell: ({ row }) => (
      <DataTableCellNav
        value={row.original.name}
        route={`/user/${row.original.id}`}
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header="Email" />
    ),
    enableMultiSort: false,
    cell: ({ row }) => (
      <DataTableCellNav
        value={row.original.email}
        route={`/user/${row.original.id}`}
      />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} header="Role" />
    ),
    enableMultiSort: false,
    cell: ({ row }) => (
      <DataTableCellNav
        value={row.original.role}
        route={`/user/${row.original.id}`}
      />
    ),
  },
];

export function UserTable() {
  return (
    <DataTable
      title="User"
      description="Daftar user yang menggunakan aplikasi"
      columns={columns}
      initialSorts={[{ id: "name", desc: false }]}
    />
  );
}
