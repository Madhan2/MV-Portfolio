const { achievements } = require("../data/data");

// GET all achievements
function getAchievements(req, res) {
  res.status(200).json({
    success: true,
    data: achievements,
  });
}

// ADD achievement
function createAchievement(req, res) {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Achievement name is required",
    });
  }

  const achievement = {
    id: Date.now().toString(),
    name: name.trim(),
  };

  achievements.push(achievement);

  res.status(201).json({
    success: true,
    data: achievement,
  });
}

// UPDATE achievement
function updateAchievement(req, res) {
  const achievement = achievements.find((item) => item.id === req.params.id);

  if (!achievement) {
    return res.status(404).json({
      success: false,
      message: "Achievement not found",
    });
  }

  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Achievement name is required",
    });
  }

  achievement.name = name.trim();

  res.status(200).json({
    success: true,
    data: achievement,
  });
}

// DELETE achievement
function deleteAchievement(req, res) {
  const index = achievements.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Achievement not found",
    });
  }

  const deleted = achievements.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Achievement deleted",
    data: deleted[0],
  });
}

module.exports = {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
