const express = require("express");
const router = express.Router();
const Case = require("../models/Case");

// POST /api/case  →  Create a case update
router.post("/", async (req, res) => {
  try {
    const caseRecord = new Case(req.body);
    const saved = await caseRecord.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/case  →  Get all case records
router.get("/", async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/case/:id  →  Get one case record
router.get("/:id", async (req, res) => {
  try {
    const caseRecord = await Case.findById(req.params.id);
    if (!caseRecord) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.status(200).json(caseRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/case/:id  →  Update a case
router.put("/:id", async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/case/:id  →  Delete a case
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Case.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Case not found" });
    }
    res.status(200).json({ message: "Case deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;