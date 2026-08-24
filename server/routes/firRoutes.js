const express = require("express");
const router = express.Router();
const FIR = require("../models/FIR");

// ─────────────────────────────────────────
// POST /api/fir  →  Create a new FIR
// ─────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const fir = new FIR(req.body);
    const savedFIR = await fir.save();
    res.status(201).json(savedFIR);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/fir  →  Get all FIRs
// ─────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const firs = await FIR.find();
    res.status(200).json(firs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/fir/:id  →  Get single FIR by ID
// ─────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const fir = await FIR.findById(req.params.id);
    if (!fir) {
      return res.status(404).json({ message: "FIR not found" });
    }
    res.status(200).json(fir);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/fir/:id  →  Update a FIR
// ─────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const updatedFIR = await FIR.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );
    if (!updatedFIR) {
      return res.status(404).json({ message: "FIR not found" });
    }
    res.status(200).json(updatedFIR);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// DELETE /api/fir/:id  →  Delete a FIR
// ─────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deletedFIR = await FIR.findByIdAndDelete(req.params.id);
    if (!deletedFIR) {
      return res.status(404).json({ message: "FIR not found" });
    }
    res.status(200).json({ message: "FIR deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;