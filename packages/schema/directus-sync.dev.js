require("dotenv").config();

module.exports = {
  debug: true,
  directusUrl: process.env.DIRECTUS_DEV_URL,
  directusToken: process.env.DIRECTUS_DEV_TOKEN,
  dumpPath: "./directus",
  // Additional options...
};
