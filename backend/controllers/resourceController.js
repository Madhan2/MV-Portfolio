
const { projects, skills } = require("../data/data");

// Get the correct array based on the URL
function getResource(req, res) {
    const resource = req.params.resource;

    if (resource === "projects") {
        return projects;
    }

    if (resource === "skills") {
        return skills;
    }

    return null;
}

// GET all projects or skills
function getAll(req, res) {
    const data = getResource(req, res);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Resource not found"
        });
    }

    res.status(200).json({
        success: true,
        count: data.length,
        data: data
    });
}

// POST - Add a new project or skill
function create(req, res) {
    const data = getResource(req, res);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Resource not found"
        });
    }

    const newItem = {
        id: Date.now().toString(),
        ...req.body
    };

    data.push(newItem);

    res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: newItem
    });
}

// PUT - Update an existing item
function update(req, res) {
    const data = getResource(req, res);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Resource not found"
        });
    }

    const item = data.find(
        item => item.id === req.params.id
    );

    if (!item) {
        return res.status(404).json({
            success: false,
            message: "Item not found"
        });
    }

    Object.assign(item, req.body);

    res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: item
    });
}

// DELETE - Remove an item
function remove(req, res) {
    const data = getResource(req, res);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Resource not found"
        });
    }

    const index = data.findIndex(
        item => item.id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Item not found"
        });
    }

    const deletedItem = data.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        data: deletedItem[0]
    });
}

// GET one specific project
function getOneProject(req, res) {
    const project = projects.find(
        item => item.id === req.params.id
    );

    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }

    res.status(200).json({
        success: true,
        data: project
    });
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getOneProject
};
