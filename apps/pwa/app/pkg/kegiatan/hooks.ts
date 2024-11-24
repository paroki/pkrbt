import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { JenisKegiatanR } from "@pkrbt/directus";

export default function useJenisKegiatan() {
  const [items, setItems] = useState<JenisKegiatanR[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher<JenisKegiatanR[]>();

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      fetcher.load("/kegiatan/jenis-kegiatan");
      setLoading(true);
    }
  }, [fetcher, loaded]);

  useEffect(() => {
    if (fetcher.data) {
      setItems(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (fetcher.state === "idle") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [fetcher.state]);

  function reload() {
    setLoaded(false);
  }

  return { items, loading, loaded, fetcher, reload };
}
