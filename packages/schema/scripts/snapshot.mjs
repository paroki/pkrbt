// const fetch = require("cross-fetch");

import { configDotenv } from "dotenv";
import { getToken } from "./auth.mjs";
import { exit } from "process";

let auth = {};

async function main() {
  configDotenv();
  auth = await getToken();

  console.log(auth);
  exit(0);
}

await main();
