import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

export function useLoading() {
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (nav.state === "submitting") {
      setLoading(true);
    } else if (nav.state === "idle" && loading) {
      setLoading(false);
    }
  }, [loading, nav.state]);

  return loading;
}

export function useSubmitting() {
  const nav = useNavigation();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (nav.state === "submitting") {
      setSubmitting(true);
    } else if (nav.state === "idle" && submitting) {
      setSubmitting(false);
    }
  }, [nav.state, submitting]);

  return submitting;
}
