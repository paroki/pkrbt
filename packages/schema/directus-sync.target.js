require("dotenv").config();

module.exports = {
  directusUrl: process.env.TARGET_URL,
  directusToken: process.env.TARGET_TOKEN,
  dumpPath: "./directus",
  // Additional options...
};
