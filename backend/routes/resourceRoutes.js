
const express = require("express");

const router = express.Router();

const {
    getAll,
    create,
    update,
    remove,
    getOneProject
} = require("../controllers/resourceController");

// GET all projects or skills
router.get("/:resource", getAll);

// POST a new project or skill
router.post("/:resource", create);

// PUT - Update an existing item
router.put("/:resource/:id", update);

// DELETE - Delete an item
router.delete("/:resource/:id", remove);

// GET one specific project
router.get("/projects/:id", getOneProject);

module.exports = router;
