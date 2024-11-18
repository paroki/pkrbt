/* eslint-disable react-hooks/exhaustive-deps */
import { MisaR } from "@pkrbt/directus";
import {
  Link,
  useFetcher,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { Loader2, LucidePlusCircle, LucideSearch } from "lucide-react";
import { cn, toLocalDate, toMoney } from "~/common/utils";
import { sortPendapatan } from "../utils";
import { Button } from "~/components/shadcn/button";
import MonthlyMenu from "~/components/menu/MonthlyMenu";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";

type Props = {
  items: MisaR[];
};

function MisaDetail({ misa }: { misa: MisaR }) {
  let total = 0;
  misa.pendapatan.map((item) => {
    total += item.jumlah ?? 0;
  });

  return (
    <div className="flex-1 w-full flex-col h-full">
      <div className={cn("flex flex-row text-sm mb-2 gap-x-2", "border-b")}>
        <div className="flex flex-col items-start justify-center">
          <span>{toLocalDate(misa.tanggal, "dddd, DD MMMM YYYY")}</span>
          <span className="font-bold text-wrap">{misa.perayaan}</span>
        </div>
        <div>
          <Link
            to={`/pendapatan/misa/${misa.id}`}
            className={cn("flex text-xs items-center gap-x-2")}
          >
            <LucideSearch />
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        {sortPendapatan(misa.pendapatan).map((pendapatan, index) => (
          <div
            key={index}
            className="flex flex-row border-b items-center gap-x-2"
          >
            <span className="w-32 overflow-auto">
              {pendapatan.sumber.sumber}
            </span>
            <span className="w-24 text-right">
              {pendapatan.jumlah && toMoney(pendapatan.jumlah)}
            </span>
          </div>
        ))}
        <div
          className={cn(
            "flex flex-row items-center gap-x-2",
            "font-semibold text-blue-800",
          )}
        >
          <span className="w-32">Total</span>
          <span
            className={cn(
              "w-24 text-right",
              "border-green-700 border-t border-b border-y-2",
            )}
          >
            {toMoney(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

function MisaNotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data tidak ditemukan</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Data pendapatan tidak ditemukan. Ganti bulan dengan nilai yang lain.
        </p>
      </CardContent>
    </Card>
  );
}

function MisaScroll({
  month,
  items: initialItems,
  setLoading,
}: {
  month: number;
  items: MisaR[];
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [items, setItems] = useState(initialItems);
  const fetcher = useFetcher<{ pendapatan: MisaR[] }>();

  // scroll state
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [height, setHeight] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [page, setPage] = useState(2);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setLoading(fetcher.state === "idle" ? false : true);
  }, [fetcher.state, setLoading]);

  // Add Listeners to scroll and client resize
  useEffect(() => {
    const scrollListener = () => {
      setClientHeight(window.innerHeight);
      setScrollPosition(window.scrollY);
    };

    // Avoid running during SSR
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollListener);
    }

    // Clean up
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", scrollListener);
      }
    };
  }, []);

  useEffect(() => {
    setShouldFetch(true);
    setItems(initialItems);
  }, [initialItems]);

  // Listen on scrolls. Fire on some self-described breakpoint
  useEffect(() => {
    if (!shouldFetch || !height) return;
    if (clientHeight + scrollPosition + 100 < height) return;
    const url = `/pendapatan/misa?index&mode=scroll&page=${page}${month > 0 ? "&month=" + month : ""}`;
    fetcher.load(url);
    setShouldFetch(false);
  }, [clientHeight, scrollPosition, fetcher, shouldFetch]);

  // Merge items, increment page, and allow fetching again
  useEffect(() => {
    if (fetcher.state === "loading") {
      return;
    }

    if (fetcher.data?.pendapatan && fetcher.data.pendapatan.length === 0) {
      setShouldFetch(false);
      return;
    }

    if (fetcher.data?.pendapatan && fetcher.data.pendapatan.length > 0) {
      const newItems = fetcher.data?.pendapatan as MisaR[];
      setItems((prev) => [...prev, ...newItems]);
      setShouldFetch(true);
      setPage(page + 1);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-x-4 gap-y-4")}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "p-4",
            "bg-white border rounded-md drop-shadow-md",
            "w-full md:w-auto lg:w-auto",
          )}
        >
          <MisaDetail key={item.id} misa={item} />
        </div>
      ))}
    </div>
  );
}

export default function MisaList({ items }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({
    month: "0",
  });
  const [initialMonth, setInitialMonth] = useState<number>();
  const [month, setMonth] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const num = Number(searchParams.get("month"));
    if (num > 0) {
      setInitialMonth(num);
    }
  }, [searchParams]);

  useEffect(() => {
    if (undefined === month) return;
    const url = `/pendapatan/misa?month=${month}`;
    navigate(url, {
      replace: true,
    });
  }, [month, navigate]);

  return (
    <div className="flex flex-col min-h-[90vh]">
      {items.length === 0 ? (
        <MisaNotFound />
      ) : (
        <MisaScroll setLoading={setLoading} items={items} month={month ?? 0} />
      )}

      {loading && (
        <div className="flex flex-row flex-1 items-center justify-center mt-4">
          <Button disabled>
            <Loader2 className="animate-spin" />
            Loading ...
          </Button>
        </div>
      )}

      <div className="flex-grow mb-20"></div>

      <div
        className={cn(
          "fixed bottom-0 left-0 z-50 bg-white flex w-full mt-4",
          "items-center justify-center",
          "border",
        )}
      >
        <div className="flex flex-row px-4 py-2 gap-x-2">
          <Button asChild className="h-8 text-xs">
            <Link to="/pendapatan/misa/create">
              <LucidePlusCircle />
              Tambah
            </Link>
          </Button>
          <MonthlyMenu setMonth={setMonth} defaultValue={initialMonth} />
        </div>
      </div>
    </div>
  );
}
