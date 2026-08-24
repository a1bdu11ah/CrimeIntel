const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema(
  {
    evidenceName: {
      type: String,
      required: true,
    },
    evidenceType: {
      type: String,
      required: true,
    },
    collectedDate: {
      type: Date,
      required: true,
    },
    caseNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Evidence", evidenceSchema);