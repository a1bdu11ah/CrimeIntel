const { Pool } = require("pg");
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
let pool;
function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Set DATABASE_URL in server/.env to your Neon connection string.");
  }
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5,
      idleTimeoutMillis: 10000, connectionTimeoutMillis: 15000, allowExitOnIdle: true });
    pool.on("error", () => console.error("Unexpected idle PostgreSQL connection error"));
  }
  return pool;
}
module.exports = {
  query: (text, values) => getPool().query(text, values),
  close: async () => { if (pool) { await pool.end(); pool = undefined; } },
};
