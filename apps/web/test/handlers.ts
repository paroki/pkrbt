import { http } from "msw";

const baseUrl = process.env.NEXT_PUBLIC_CMS_URL + "/api";
export const handlers = [
  http.get(`/homepage`, () => {
    console.log("captured /articles");
  }),
];
