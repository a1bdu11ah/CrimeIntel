const fs = require("node:fs/promises");
const path = require("node:path");
const db = require("../db");
async function migrate() {
  try {
    await db.query(await fs.readFile(path.join(__dirname, "../schema.sql"), "utf8"));
    console.log("PostgreSQL tables are ready.");
  } finally { await db.close(); }
}
migrate().catch(() => {
  console.error("Database setup failed. Check DATABASE_URL and database access.");
  process.exitCode = 1;
});
