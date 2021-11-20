const knex = require("knex");
const defaultConfig = require("./knexfile");

const config = {
  client: "postgres",
  connection: {
    user: process.env.DB_USERNAME || "username",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "database",
    database: process.env.DB_NAME || "timonapath",
  },
  debug: true,
  ...defaultConfig,
};

module.exports = knex(config);
