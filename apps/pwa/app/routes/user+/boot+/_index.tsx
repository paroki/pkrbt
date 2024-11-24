import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useGlobalNavigationState } from "remix-utils/use-global-navigation-state";
import Container from "~/components/layout/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Progress } from "~/components/shadcn/progress";
import { Separator } from "~/components/shadcn/separator";

const quotes = [
  {
    title: "Tahukah Anda?",
    content: (
      <p>
        Pastor pendiri paroki kita yaitu Pastor Schoots Mulai melakukan turne di
        Dataran Tinggi Tunjung pada tanggal 14 April 1936, selama 3 minggu
        dengan berjalan kaki. Pada saat itu beliau belajar bahasa Dayak Tonyoi
        dan mulai membaptis umat di PKRBT.
      </p>
    ),
  },
];

let loaded = false;

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const loading = useGlobalNavigationState();
  const fetcher = useFetcher();

  useEffect(() => {
    function startBoot() {
      if (loaded) {
        return;
      }

      const bootUrls = ["/user/boot/policies", "/user/boot/permissions"];
      console.log("boot started");
      bootUrls.map((item, index) => {
        const cVal = (index + 1) / bootUrls.length;
        setProgress(cVal);
        fetcher.load(item);
      });
      loaded = true;
    }
    if (loading.includes("idle") && !started) {
      setStarted(true);
      startBoot();
    }
  }, [fetcher, loading, started]);

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Users booting</CardTitle>
          <CardDescription>
            Mohon tunggu sebentar sementara kami memproses login anda.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-y-8">
            <div className="flex flex-row max-w-sm">
              <Progress value={progress} className="w-96" />
            </div>
            <div className="flex flex-col border rounded-md drop-shadow-md p-4 max-w-sm">
              <h1 className="text-2xl font-bold">{quotes[0].title}</h1>
              {quotes[0].content}
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
