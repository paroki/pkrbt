import { useEffect, useState } from "react";
import { useFetcher, useNavigation } from "react-router";

export function useLoading() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(navigation.state !== "idle");

  useEffect(() => {
    setLoading(navigation.state !== "idle");
  }, [navigation]);

  return loading;
}
