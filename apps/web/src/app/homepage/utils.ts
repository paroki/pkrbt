import api from "@/utils/strapi";
import type { Homepage } from "@pkrbt/openapi";

export async function fetchHomepage(): Promise<undefined | Required<Homepage>> {
  const { data } = await api.fetch.GET("/homepage", {
    params: {
      query: {
        populate: "*",
      },
    },
  });

  let homepage = undefined;
  if (data?.data) {
    homepage = data.data as Required<Homepage>;
  }

  return homepage;
}
