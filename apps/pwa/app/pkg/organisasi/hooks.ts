import { OrganisasiR } from "@pkrbt/directus";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

export function useOrganisasi() {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<OrganisasiR[]>([]);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher<OrganisasiR[]>();

  useEffect(() => {
    if (!loaded) {
      setLoading(true);
      fetcher.load("/organisasi/lists");
      setLoaded(true);
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
    }
  }, [fetcher.state]);

  function reload() {
    setLoaded(false);
  }

  return { items, loading, loaded, reload };
}
