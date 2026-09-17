const express = require("express");
const router = express.Router();
const Criminal = require("../models/Criminal");

// POST /api/criminal  →  Add a new criminal
router.post("/", async (req, res) => {
  try {
    const criminal = new Criminal(req.body);
    const saved = await criminal.save();
    res.status(201).json(saved);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// GET /api/criminal  →  Get all criminals
router.get("/", async (req, res) => {
  try {
    const criminals = await Criminal.find();
    res.status(200).json(criminals);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// GET /api/criminal/:id  →  Get one criminal
router.get("/:id", async (req, res) => {
  try {
    const criminal = await Criminal.findById(req.params.id);
    if (!criminal) {
      return res.status(404).json({ message: "Criminal not found" });
    }
    res.status(200).json(criminal);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// PUT /api/criminal/:id  →  Update a criminal
router.put("/:id", async (req, res) => {
  try {
    const updated = await Criminal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Criminal not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// DELETE /api/criminal/:id  →  Delete a criminal
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Criminal.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Criminal not found" });
    }
    res.status(200).json({ message: "Criminal record deleted successfully" });
  } catch (error) {
    require("../respondError")(res, error);
  }
});

module.exports = router;