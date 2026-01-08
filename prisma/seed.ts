import "dotenv/config";
import { genAdminUsers, genFakeUsers } from "./seeds/users";
import { IS_PRODUCTION } from "~/lib/config";

export async function main() {
  // console.log(process.env.NODE_ENV);
  await genAdminUsers();

  if (!IS_PRODUCTION) {
    await genFakeUsers();
  }
}

await main();
