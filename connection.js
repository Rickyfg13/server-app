const pgp = require("pg-promise")();
const dotenv = require("dotenv");

dotenv.config();

// const db = pgp("postgres://postgres:12345678@localhost:5432/postgres");

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

module.exports = db;
