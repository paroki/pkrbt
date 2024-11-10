import { Button } from "@pkrbt/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@pkrbt/ui/shadcn/card";
import { SkipBackIcon } from "lucide-react";
import Link from "next/link";

export default function Custom403() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Oops!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-24">
            <p>Anda tidak memiliki hak akses untuk fitur ini</p>
            <Button asChild>
              <Link href="/">
                <SkipBackIcon />
                Kembali
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
