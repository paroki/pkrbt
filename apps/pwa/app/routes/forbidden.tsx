import { Link } from "@remix-run/react";
import Container from "~/components/layout/Container";
import { Button } from "~/components/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";

export default function Page() {
  return (
    <Container>
      <div className="w-full items-center">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Oops!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-sm">
              <h1 className="text-xl font-semibold text-red-50">
                Anda tidak memiliki hak akses untuk layanan ini!
              </h1>
              <p>
                Sepertinya anda memiliki kemampuan sebagai programmer, mohon
                bergabung dengan{" "}
                <a
                  href="https://github.com/paroki/pkrbt"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tim PKRBT Developer
                </a>{" "}
                jika anda tertarik untuk berkontribusi dalam pengembangan
                aplikasi PKRBT.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/">Kembali</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}
