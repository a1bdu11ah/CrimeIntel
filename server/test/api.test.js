const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { newDb } = require("pg-mem");
const db = require("../db");
let server, base, pool;
before(async () => {
  const memory = newDb();
  memory.public.none(fs.readFileSync(path.join(__dirname, "../schema.sql"), "utf8"));
  pool = new (memory.adapters.createPg().Pool)();
  db.query = (sql, values) => pool.query(sql, values);
  server = require("../server").listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}/api`;
});
after(async () => {
  if (server) await new Promise(resolve => server.close(resolve));
  if (pool) await pool.end();
});
async function request(route, method = "GET", body) {
  const response = await fetch(base + route, { method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body) });
  return { status: response.status, body: await response.json() };
}
const fixtures = {
  fir: { firNumber: "F-1", date: "2026-09-17", policeStation: "Central", complainantName: "Test", crimeType: "Theft" },
  criminal: { name: "O'Brien", age: "30", gender: "Male", address: "Test address", crimeType: "Theft", arrestDate: "2026-09-17" },
  case: { caseNumber: "C-1", caseType: "Theft", status: "Open", assignedOfficer: "Test", courtDate: "2026-09-17" },
  evidence: { evidenceName: "Test item", evidenceType: "Physical", collectedDate: "2026-09-17", caseNumber: "C-1" },
  personnel: { name: "Test officer", rank: "Inspector", department: "Central", contactNumber: "0123456789" },
};
for (const [route, fixture] of Object.entries(fixtures)) {
  test(`${route}: CRUD, validation and API compatibility`, async () => {
    assert.equal((await request(`/${route}`, "POST", {})).status, 400);
    const created = await request(`/${route}`, "POST", { ...fixture, _id: "injected", unknown: "ignored" });
    assert.equal(created.status, 201);
    const id = created.body._id;
    assert.ok(id && id !== "injected");
    assert.ok(created.body.createdAt && created.body.updatedAt);
    assert.equal(created.body.unknown, undefined);
    if (route === "fir") assert.equal(created.body.status, "Open");
    if (route === "criminal") assert.equal(created.body.age, 30);
    if (["fir", "case"].includes(route)) assert.equal((await request(`/${route}`, "POST", fixture)).status, 409);
    assert.equal((await request(`/${route}/${id}`)).body._id, id);
    assert.equal((await request(`/${route}`)).body.length, 1);
    const field = Object.keys(fixture)[0];
    const value = "Updated ' value; DROP TABLE firs; --";
    const updated = await request(`/${route}/${id}`, "PUT", { [field]: value, _id: "changed" });
    assert.equal(updated.status, 200);
    assert.equal(updated.body[field], value);
    assert.equal(updated.body._id, id);
    assert.equal((await request(`/${route}/${id}`, "PUT", { [field]: "" })).status, 400);
    assert.equal((await request(`/${route}/missing`, "PUT", fixture)).status, 404);
    assert.equal((await request(`/${route}/${id}`, "DELETE")).status, 200);
    assert.equal((await request(`/${route}/${id}`)).status, 404);
    assert.equal((await request(`/${route}/${id}`, "DELETE")).status, 404);
  });
}
test("invalid dates and numbers are rejected", async () => {
  assert.equal((await request('/criminal', 'POST', { ...fixtures.criminal, age: 'abc' })).status, 400);
  assert.equal((await request('/fir', 'POST', { ...fixtures.fir, date: 'invalid' })).status, 400);
});
