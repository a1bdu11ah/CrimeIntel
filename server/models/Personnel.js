const mongoose = require("mongoose");

const personnelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Personnel", personnelSchema);