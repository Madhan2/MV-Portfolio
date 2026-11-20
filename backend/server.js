
const path = require("path");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// Import routes
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serve frontend files
app.use(express.static(
    path.join(__dirname, "../frontend")
));

// Main portfolio page
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );
});

// API information
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
            "GET /api/achievements",
            "POST /api/achievements",
            "PUT /api/achievements/:id",
            "DELETE /api/achievements/:id",
            "POST /api/auth/login",
            "GET /api/auth/me",
            "POST /api/auth/logout"
        ]
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running"
    });
});

// Register API routes
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api", resourceRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Centralized error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
