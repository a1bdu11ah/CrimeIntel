const express = require("express");
const router = express.Router();
const Personnel = require("../models/Personnel");

// POST /api/personnel  →  Add a personnel
router.post("/", async (req, res) => {
  try {
    const person = new Personnel(req.body);
    const saved = await person.save();
    res.status(201).json(saved);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// GET /api/personnel  →  Get all personnel
router.get("/", async (req, res) => {
  try {
    const personnelList = await Personnel.find();
    res.status(200).json(personnelList);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// GET /api/personnel/:id  →  Get one person
router.get("/:id", async (req, res) => {
  try {
    const person = await Personnel.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Personnel not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// PUT /api/personnel/:id  →  Update a person
router.put("/:id", async (req, res) => {
  try {
    const updated = await Personnel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Personnel not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    require("../respondError")(res, error);
  }
});

// DELETE /api/personnel/:id  →  Delete a person
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Personnel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Personnel not found" });
    }
    res.status(200).json({ message: "Personnel deleted successfully" });
  } catch (error) {
    require("../respondError")(res, error);
  }
});

module.exports = router;