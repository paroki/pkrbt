import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { LingkunganR, WilayahR } from "@pkrbt/directus";

export function useWilayah() {
  const [loaded, setLoaded] = useState(false);
  const [wilayah, setWilayah] = useState<WilayahR[]>([]);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher<WilayahR[]>();

  useEffect(() => {
    if (!loaded) {
      setLoading(true);
      fetcher.load("/referensi/wilayah");
      setLoaded(true);
    }
  }, [fetcher, loaded]);

  useEffect(() => {
    if (fetcher.data) {
      setWilayah(fetcher.data);
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

  /**
   * Get nama wilayah based on id
   */
  function getNamaWilayah(id: string) {
    for (let i = 0; i < wilayah.length; i++) {
      const w = wilayah[i];

      if (w.id === id) {
        return w.nama;
      }
    }
  }

  return { wilayah, loading, loaded, reload, getNamaWilayah };
}

export function useLingkungan() {
  const [loaded, setLoaded] = useState(false);
  const [lingkungan, setLingkungan] = useState<LingkunganR[]>([]);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher<LingkunganR[]>();

  useEffect(() => {
    if (!loaded) {
      setLoading(true);
      fetcher.load("/referensi/lingkungan");
      setLoaded(true);
    }
  }, [fetcher, loaded]);

  useEffect(() => {
    if (fetcher.data) {
      setLingkungan(fetcher.data);
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

  return { lingkungan, loading, loaded, reload };
}
