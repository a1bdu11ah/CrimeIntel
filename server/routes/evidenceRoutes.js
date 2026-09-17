const express = require("express");
const router = express.Router();
const Evidence = require("../models/Evidence");

// POST /api/evidence  →  Add evidence
router.post("/", async (req, res) => {
  try {
    const evidence = new Evidence(req.body);
    const saved = await evidence.save();
    res.status(201).json(saved);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// GET /api/evidence  →  Get all evidence
router.get("/", async (req, res) => {
  try {
    const evidenceList = await Evidence.find();
    res.status(200).json(evidenceList);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// GET /api/evidence/:id  →  Get one evidence record
router.get("/:id", async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) {
      return res.status(404).json({ message: "Evidence not found" });
    }
    res.status(200).json(evidence);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// PUT /api/evidence/:id  →  Update evidence
router.put("/:id", async (req, res) => {
  try {
    const updated = await Evidence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Evidence not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// DELETE /api/evidence/:id  →  Delete evidence
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Evidence.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Evidence not found" });
    }
    res.status(200).json({ message: "Evidence deleted successfully" });
  } catch (error) {
    require("../respondError")(res, error);
  }
});

module.exports = router;