const errorHandler = require("./middleware/errorHandler");

const express = require("express");
const cors = require("cors");

// Import route files
const resourceRoutes = require("./routes/resourceRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main server route
app.get("/", (req, res) => {
  res.send("Welcome to Madhan's Portfolio API!");
});

// API information route
app.get("/api", (req, res) => {
  res.json({
    message: "Portfolio REST API",
    endpoints: [
      "GET /api/health",
      "GET /api/portfolio",
      "GET /api/projects",
      "GET /api/projects/:id",
      "GET /api/skills",
      "POST /api/projects",
      "POST /api/skills",
      "PUT /api/:resource/:id",
      "DELETE /api/:resource/:id",
    ],
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
  });
});

// Register routes
app.use("/api/portfolio", portfolioRoutes);
app.use("/api", resourceRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Centralized error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
