require("dotenv").config();

module.exports = {
  directusUrl: process.env.DIRECTUS_DEV_URL,
  directusToken: process.env.DIRECTUS_DEV_TOKEN,
  dumpPath: "./directus",
  // Additional options...
};
