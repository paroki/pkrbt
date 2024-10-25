const { createDirectus, authentication } = require("@directus/sdk");
require("dotenv").config();

const client = createDirectus("http://localhost:8055").with(
  authentication("json"),
);
client
  .login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
  .then((result) => {
    console.log(result);
  });

module.exports = {
  debug: true,
  directusUrl: "http://localhost:8055",
  //directusEmail: process.env.ADMIN_EMAIL,
  //directusPassword: process.env.ADMIN_PASSWORD,
  /// directusToken: process.env.DIRECTUS_TOKEN,
  dumpPath: "./directus",
  // Additional options...
};
