require("dotenv").config();

module.exports = {
  directusUrl: "http://localhost:8055",
  directusEmail: process.env.ADMIN_EMAIL,
  directusPassword: process.env.ADMIN_PASSWORD,
  dumpPath: "./directus",
  // Additional options...
};
