const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    caseType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    assignedOfficer: {
      type: String,
      required: true,
    },
    courtDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Case", caseSchema);