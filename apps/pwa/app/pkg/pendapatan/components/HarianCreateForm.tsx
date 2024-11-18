import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import PendapatanForm from "./PendapatanForm";
import { PendapatanR } from "@pkrbt/directus";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

export default function HarianCreateForm({
  pendapatan,
}: {
  pendapatan?: PendapatanR;
}) {
  const [created, setCreated] = useState(pendapatan);

  useEffect(() => {
    if (pendapatan) {
      setCreated(pendapatan);
    }
  }, [pendapatan]);

  return (
    <Card className="mx-auto max-w-sm lg:max-w-[60vw]">
      <CardHeader>
        <CardTitle>Data Pendapatan Harian Baru</CardTitle>
        <CardDescription>
          <p>
            Untuk menambahkan pendapatan baru yang berhubungan dengan misa
            gunakan formulir di{" "}
            <Link to="/pendapatan/misa" className="font-bold text-blue-700">
              halaman ini
            </Link>
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <PendapatanForm intent="create" pendapatan={created} />
      </CardContent>
    </Card>
  );
}
