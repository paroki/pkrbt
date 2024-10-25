require("dotenv").config();

module.exports = {
  debug: true,
  directusUrl: process.env.DIRECTUS_LIVE_URL,
  directusToken: process.env.DIRECTUS_LIVE_TOKEN,
  dumpPath: "./directus",
};
