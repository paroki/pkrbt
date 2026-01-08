import type { User } from "better-auth";
import { useNavigate } from "react-router";
import { EditButton } from "shared/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function UserList({ users }: { users: User[] }) {
  const navigate = useNavigate();
  const goToUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="cursor-pointer"
              onClick={() => {
                goToUser(user.id);
              }}
            >
              <TableCell>
                <EditButton
                  url={`/user/${user.id}`}
                  cellMode={true}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
