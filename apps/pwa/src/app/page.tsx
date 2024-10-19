import { page } from "@pkrbt/directus";
import { Card, CardContent } from "@pkrbt/ui/components/ui/card";

export default async function Home() {
  const data = await page.fetchPage("home");
  console.log(JSON.stringify(data, undefined, 2));
  return (
    <div className="flex w-full content-center">
      <div className="flex items-center lg:w-3/4">
        <Card className="flex">
          <CardContent></CardContent>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
