
const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");

const {
    login,
    checkAuth,
    logout
} = require("../controllers/authController");

const requireAuth = require("../middleware/authMiddleware");

// Limit repeated login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Try again later."
    }
});

router.post("/login", loginLimiter, login);

router.get("/me", requireAuth, checkAuth);

router.post("/logout", requireAuth, logout);

module.exports = router;

