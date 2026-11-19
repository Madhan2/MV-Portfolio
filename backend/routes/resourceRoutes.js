
const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const router = express.Router();

const {
    getAll,
    create,
    update,
    remove,
    getOneProject
} = require("../controllers/resourceController");

router.get("/:resource", getAll);

router.post("/:resource", requireAuth, create);

router.put("/:resource/:id", requireAuth, update);

router.delete("/:resource/:id", requireAuth, remove);

router.get("/projects/:id", getOneProject);

module.exports = router;
