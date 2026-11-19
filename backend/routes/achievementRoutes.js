const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");
const {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievementController");

router.get("/", getAchievements);

router.post("/", requireAuth, createAchievement);

router.put("/:id", requireAuth, updateAchievement);

router.delete("/:id", requireAuth, deleteAchievement);

module.exports = router;
