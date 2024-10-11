import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">PKRBT</CardTitle>
        <CardDescription>
          Aplikasi layanan informasi Paroki Kristus Raja Barong Tongkok.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
            Instagram
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
