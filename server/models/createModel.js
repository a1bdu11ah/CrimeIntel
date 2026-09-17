const { randomUUID } = require("node:crypto");
const db = require("../db");
// Identifiers come only from model definitions; request values are parameters.
const quote = (name) => `"${name}"`;
const invalid = (message) => Object.assign(new Error(message), { status: 400 });

module.exports = function createModel(table, fields) {
  function validate(input, partial = false) {
    if (!input || typeof input !== "object" || Array.isArray(input)) throw invalid("A JSON object is required");
    const result = {};
    for (const [name, rule] of Object.entries(fields)) {
      let value = input[name];
      if (value === undefined && partial) continue;
      if (value === undefined) value = rule.default;
      if (value === undefined || value === null || value === "") {
        if (rule.required) throw invalid(`${name} is required`);
        if (value !== undefined) result[name] = value;
        continue;
      }
      if (rule.type === "date") {
        if (typeof value !== "string" || Number.isNaN(Date.parse(value))) throw invalid(`${name} must be a valid date`);
        value = new Date(value).toISOString();
      } else if (rule.type === "number") {
        if (!["string", "number"].includes(typeof value) || !Number.isFinite(Number(value))) throw invalid(`${name} must be a number`);
        value = Number(value);
      } else if (typeof value !== "string" || (rule.required && !value.trim())) {
        throw invalid(`${name} must be a non-empty string`);
      }
      result[name] = value;
    }
    return result;
  }
  return class Record {
    constructor(input) { this.input = input; }
    async save() {
      const data = { _id: randomUUID(), ...validate(this.input) };
      const columns = Object.keys(data);
      return (await db.query(
        `INSERT INTO ${quote(table)} (${columns.map(quote).join(", ")}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING *`,
        Object.values(data)
      )).rows[0];
    }
    static async find() {
      return (await db.query(`SELECT * FROM ${quote(table)} ORDER BY "createdAt", "_id"`)).rows;
    }
    static async findById(id) {
      return (await db.query(`SELECT * FROM ${quote(table)} WHERE "_id" = $1`, [id])).rows[0] || null;
    }
    static async findByIdAndUpdate(id, input) {
      const data = validate(input, true);
      const columns = Object.keys(data);
      if (!columns.length) return this.findById(id);
      const values = [...Object.values(data), id];
      return (await db.query(
        `UPDATE ${quote(table)} SET ${columns.map((name, i) => `${quote(name)} = $${i + 1}`).join(", ")}, "updatedAt" = CURRENT_TIMESTAMP WHERE "_id" = $${values.length} RETURNING *`, values
      )).rows[0] || null;
    }
    static async findByIdAndDelete(id) {
      return (await db.query(`DELETE FROM ${quote(table)} WHERE "_id" = $1 RETURNING *`, [id])).rows[0] || null;
    }
  };
};
