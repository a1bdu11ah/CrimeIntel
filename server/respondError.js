module.exports = (res, error) => {
  if (error.code === "23505") return res.status(409).json({ message: "A record with that number already exists" });
  if (error.status === 400) return res.status(400).json({ message: error.message });
  if (["23502", "22007", "22008", "22P02"].includes(error.code)) {
    return res.status(400).json({ message: "Invalid or missing field value" });
  }
  // Do not expose database connection details or SQL to clients.
  console.error("Database request failed", error.code || error.name);
  return res.status(500).json({ message: "Database request failed. Check the server database configuration." });
};
