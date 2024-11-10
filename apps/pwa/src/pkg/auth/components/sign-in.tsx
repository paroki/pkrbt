"use client";
import { DEVELOPMENT, DIRECTUS_URL, PUBLIC_URL } from "@/common/config";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@pkrbt/ui/shadcn/card";
import { Label } from "@pkrbt/ui/shadcn/label";
import { Input } from "@pkrbt/ui/shadcn/input";
import { Button } from "@pkrbt/ui/shadcn/button";
import { signIn } from "next-auth/react";

export default function SignInForm({}) {
  const url = `${DIRECTUS_URL}/auth/login/google?redirect=${PUBLIC_URL}/api/auth/directus`;

  const credentialsAction = (formData: FormData) => {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    return signIn("credentials", payload, {
      redirect: true,
      redirectTo: PUBLIC_URL + "/",
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Gunakanlah akun Google yang anda pakai di ponsel android/iphone
            anda!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={credentialsAction}>
            <div className="grid gap-4">
              {DEVELOPMENT && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      defaultValue="admin@pkrbt.id"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      defaultValue="directus"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </>
              )}

              <Button asChild variant="outline" className="w-full">
                <Link href={url}>Login dengan Google</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
