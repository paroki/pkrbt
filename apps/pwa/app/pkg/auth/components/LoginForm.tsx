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
import { Separator } from "~/components/shadcn/separator";

type Props = {
  directusUrl: string;
  development?: boolean;
};

export default function LoginForm({ directusUrl, development = true }: Props) {
  const googleLogoUrl =
    "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA";
  return (
    <div className="flex flex-wrap w-full min-h-screen items-center justify-center p-2 lg:p-4 bg-primary-foreground">
      <Card className="max-w-sm lg:min-w-[400px] lg:w-auto drop-shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex flex-row items-start w-full gap-x-4">
            <div className="flex w-full h-full items-center gap-x-2">
              <img src="/192x192.png" alt="@pkrbt" className="w-12 h-12" />
              <span>PKRBT</span>
            </div>
          </CardTitle>
          <CardDescription>
            Aplikasi layanan informasi Paroki Kristus Raja Barong Tongkok
            Keuskupan Agung Samarinda
          </CardDescription>
          <Separator className="mb-4" />
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col flex-wrap gap-4">
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
              <p>
                Gunakanlah akun google yang anda gunakan di ponsel
                android/iphone anda!
              </p>
              <Button asChild className="w-full">
                <Link to={directusUrl}>
                  <img src={googleLogoUrl} alt="google" className="w-6 h-6" />
                  Login dengan Google
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
