"use client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/shadcn/components/alert";
import { Button } from "@/shared/shadcn/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/card";
import { Field, FieldGroup } from "@/shared/shadcn/components/field";
import { Input } from "@/shared/shadcn/components/input";
import { Label } from "@/shared/shadcn/components/label";
import { authClient } from "@pkrbt/auth/client";
import { redirect } from "next/navigation";
import { useState } from "react";

export function LoginForm({ google }: { google: () => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

  async function loginEmail() {
    const { error: e } = await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
    if (e) {
      if (e.code === "INVALID_EMAIL_OR_PASSWORD") {
        setError("Email tidak terdaftar atau password anda salah.");
      } else {
        setError(e.message);
      }
    }
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login aplikasi PKRBT</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {error && (
          <Alert variant={"destructive"} className="bg-red-50 border-red-500">
            <AlertTitle>Gagal Login</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}
        <form className="space-y-8">
          <FieldGroup>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"horizontal"}>
          <Button type="button" onClick={async () => await loginEmail()}>
            Login
          </Button>
          <Button type="button" onClick={google}>
            Google
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
