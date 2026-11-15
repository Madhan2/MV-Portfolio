const { projects, skills } = require("../data/data");

// Get the correct data array
function getResource(resource) {
  if (resource === "projects") return projects;
  if (resource === "skills") return skills;
  return null;
}

// Validate project or skill data
function validateItem(resource, item) {
  const errors = [];

  if (resource === "projects") {
    if (typeof item.name !== "string" || !item.name.trim()) {
      errors.push("Project name is required");
    }

    if (typeof item.description !== "string" || !item.description.trim()) {
      errors.push("Project description is required");
    }

    if (
      item.technologies !== undefined &&
      (!Array.isArray(item.technologies) ||
        !item.technologies.every((t) => typeof t === "string"))
    ) {
      errors.push("Technologies must be an array of strings");
    }

    if (item.github !== undefined && typeof item.github !== "string") {
      errors.push("GitHub link must be a string");
    }

    if (item.demo !== undefined && typeof item.demo !== "string") {
      errors.push("Demo link must be a string");
    }
  }

  if (resource === "skills") {
    if (typeof item.name !== "string" || !item.name.trim()) {
      errors.push("Skill name is required");
    }

    if (typeof item.category !== "string" || !item.category.trim()) {
      errors.push("Skill category is required");
    }
  }

  return errors;
}

// Only allow fields belonging to that resource
function hasUnknownFields(resource, body) {
  const allowedFields =
    resource === "projects"
      ? ["name", "description", "technologies", "github", "demo"]
      : ["name", "category"];

  return Object.keys(body).some((key) => !allowedFields.includes(key));
}

// GET all projects or skills
function getAll(req, res) {
  const data = getResource(req.params.resource);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
}

// POST - Create a project or skill
function create(req, res) {
  const resource = req.params.resource;
  const data = getResource(resource);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      success: false,
      message: "Request body must be a JSON object",
    });
  }

  if (hasUnknownFields(resource, body)) {
    return res.status(400).json({
      success: false,
      message: "Request contains unsupported fields",
    });
  }

  const errors = validateItem(resource, body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  const newItem = {
    ...body,
    id: Date.now().toString(),
  };

  data.push(newItem);

  res.status(201).json({
    success: true,
    message: "Item created successfully",
    data: newItem,
  });
}

// PUT - Update a project or skill
function update(req, res) {
  const resource = req.params.resource;
  const data = getResource(resource);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  const item = data.find((item) => item.id === req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  const body = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide a non-empty JSON object",
    });
  }

  if (hasUnknownFields(resource, body)) {
    return res.status(400).json({
      success: false,
      message: "Request contains unsupported fields",
    });
  }

  const updatedItem = { ...item, ...body };
  const errors = validateItem(resource, updatedItem);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  Object.assign(item, body);

  res.status(200).json({
    success: true,
    message: "Item updated successfully",
    data: item,
  });
}

// DELETE - Remove a project or skill
function remove(req, res) {
  const data = getResource(req.params.resource);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  const index = data.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  const deletedItem = data.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
    data: deletedItem[0],
  });
}

// GET one specific project
function getOneProject(req, res) {
  const project = projects.find((item) => item.id === req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  res.status(200).json({
    success: true,
    data: project,
  });
}

module.exports = {
  getAll,
  create,
  update,
  remove,
  getOneProject,
};
