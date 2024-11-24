import { UserPolicy, UserRole } from "@pkrbt/directus";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

export function useUserPolicies() {
  const [policies, setPolicies] = useState<UserPolicy[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const fetcher = useFetcher<UserPolicy[]>();

  useEffect(() => {
    if (!fetched && !loading) {
      setFetched(true);
      fetcher.load("/admin/users/policies");
      setLoading(true);
    }
  }, [fetcher, fetched, loading]);

  useEffect(() => {
    if (fetcher.data) {
      setPolicies(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (fetcher.state === "idle") {
      setLoading(false);
    }
  }, [fetcher.state]);

  return { policies, loading };
}

export function useUserRoles() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const fetcher = useFetcher<UserRole[]>();

  useEffect(() => {
    if (!fetched && !loading) {
      setFetched(true);
      fetcher.load("/admin/users/roles");
      setLoading(true);
    }
  }, [fetcher, fetched, loading]);

  useEffect(() => {
    if (fetcher.data) {
      setRoles(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (fetcher.state === "idle") {
      setLoading(false);
    }
  }, [fetcher.state]);

  return { roles: roles, loading };
}
