import { useTheme } from "next-themes";
import { META_THEME_COLORS } from "~/common/config";
import { useNavigation } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useMetaColor() {
  const { resolvedTheme } = useTheme();

  const metaColor = useMemo(() => {
    return resolvedTheme !== "dark"
      ? META_THEME_COLORS.light
      : META_THEME_COLORS.dark;
  }, [resolvedTheme]);

  const setMetaColor = useCallback((color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", color);
  }, []);

  return {
    metaColor,
    setMetaColor,
  };
}

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
