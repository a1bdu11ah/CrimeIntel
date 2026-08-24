const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // allows us to read JSON from request body
app.use(cors());         // allows frontend to talk to this backend

// Import Routes
const firRoutes       = require("./routes/firRoutes");
const criminalRoutes  = require("./routes/criminalRoutes");
const caseRoutes      = require("./routes/caseRoutes");
const evidenceRoutes  = require("./routes/evidenceRoutes");
const personnelRoutes = require("./routes/personnelRoutes");

// Mount Routes
app.use("/api/fir",       firRoutes);
app.use("/api/criminal",  criminalRoutes);
app.use("/api/case",      caseRoutes);
app.use("/api/evidence",  evidenceRoutes);
app.use("/api/personnel", personnelRoutes);

// Simple root route to check if server is running
app.get("/", (req, res) => {
  res.json({ message: "CRMS Backend API is running!" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});