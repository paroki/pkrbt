import { authentication, createDirectus, rest } from "@directus/sdk";

export async function getToken() {
  console.log("get token");

  const client = createDirectus("http://localhost:8055")
    .with(authentication("json"))
    .with(rest());

  const result = await client.login("admin@example.com", "directus");

  return result;
}
