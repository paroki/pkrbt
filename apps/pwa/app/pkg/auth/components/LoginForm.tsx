import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Label } from "~/components/shadcn/label";
import { Input } from "~/components/shadcn/input";
import { Button } from "~/components/shadcn/button";
import { Link } from "@remix-run/react";

type Props = {
  directusUrl: string;
  development?: boolean;
};

export default function LoginForm({ directusUrl, development = true }: Props) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">PKRBT Login</CardTitle>
          <CardDescription>
            Gunakanlah akun Google yang anda pakai di ponsel android/iphone
            anda!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {development && (
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
                <Link to={directusUrl}>Login dengan Google</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
