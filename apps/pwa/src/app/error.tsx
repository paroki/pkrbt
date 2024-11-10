"use client";

import { UnauthorizedAccessError } from "@/common/error";
import { Button } from "@pkrbt/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@pkrbt/ui/shadcn/card";
import { SkipBackIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
};

export default function Error({ error }: Props) {
  const header = "Oops!";
  let code = 500;
  const message = error.message;

  if (error instanceof UnauthorizedAccessError) {
    code = 403;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>
            {header} - {code}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-24">
            <p>{message}</p>
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
