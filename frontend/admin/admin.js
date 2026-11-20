// =====================================
// 1. API CONFIGURATION
// =====================================

const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:5000/api"
        : "/api";

async function checkAdminAuthentication() {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      window.location.href = "login.html";
      return false;
    }

    return true;
  } catch (error) {
    console.error("Authentication check failed:", error);
    window.location.href = "login.html";
    return false;
  }
}

// =====================================
// 2. DOM ELEMENTS
// =====================================

const apiStatus = document.getElementById("api-status");
const settingsApiStatus = document.getElementById("settings-api-status");

// =====================================
// 3. FETCH HELPER
// =====================================

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
}

// =====================================
// 4. CHECK BACKEND CONNECTION
// =====================================

async function checkAPIConnection() {
  try {
    await fetchAPI("/health");

    apiStatus.textContent = "API Connected";
    settingsApiStatus.textContent = "Connected";
  } catch (error) {
    apiStatus.textContent = "API Offline";
    settingsApiStatus.textContent = "Disconnected";

    console.error("API Connection Error:", error);
  }
}

// =====================================
// 5. LOAD DASHBOARD DATA
// =====================================

async function loadDashboard() {
  try {
    const result = await fetchAPI("/portfolio");

    const portfolio = result.data;

    updateOverview(portfolio);
    displayRecentProjects(portfolio.projects);
    displayAchievements(portfolio.achievements);
  } catch (error) {
    console.error("Dashboard Loading Error:", error);
    showToast("Unable to load dashboard data", true);
  }
}

// =====================================
// 6. UPDATE OVERVIEW COUNTS
// =====================================

function updateOverview(portfolio) {
  document.getElementById("total-projects").textContent =
    portfolio.projects.length;

  document.getElementById("total-skills").textContent = portfolio.skills.length;

  document.getElementById("total-achievements").textContent =
    portfolio.achievements.length;
}

// =====================================
// 7. DISPLAY RECENT PROJECTS
// =====================================

function displayRecentProjects(projects) {
  const container = document.getElementById("recent-projects");

  container.replaceChildren();

  if (projects.length === 0) {
    container.textContent = "No projects added yet.";
    return;
  }

  projects.slice(0, 4).forEach((project) => {
    const item = document.createElement("div");
    item.className = "recent-project-item";

    const name = document.createElement("span");
    name.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    item.append(name, description);
    container.appendChild(item);
  });
}

// =====================================
// 8. DISPLAY ACHIEVEMENTS
// =====================================

function displayAchievements(achievements) {
  const container = document.getElementById("admin-achievements-list");

  container.replaceChildren();

  if (achievements.length === 0) {
    container.textContent = "No achievements available.";
    return;
  }

  achievements.forEach((achievement) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const info = document.createElement("div");
    info.className = "admin-item-info";

    const name = document.createElement("h3");
    name.textContent = achievement.name;

    info.appendChild(name);

    const actions = document.createElement("div");
    actions.className = "admin-item-actions";

    const editButton = document.createElement("button");
    editButton.className = "action-btn edit-achievement";
    editButton.textContent = "Edit";
    editButton.dataset.id = achievement.id;

    const deleteButton = document.createElement("button");
    deleteButton.className = "action-btn delete-achievement";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = achievement.id;

    actions.append(editButton, deleteButton);

    item.append(info, actions);
    container.appendChild(item);
  });
}

function displayAchievements(achievements) {
  const container = document.getElementById("admin-achievements-list");

  container.replaceChildren();

  if (achievements.length === 0) {
    container.textContent = "No achievements available.";
    return;
  }

  achievements.forEach((achievement) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const info = document.createElement("div");
    info.className = "admin-item-info";

    const name = document.createElement("h3");
    name.textContent = achievement.name;

    info.appendChild(name);

    const actions = document.createElement("div");
    actions.className = "admin-item-actions";

    const editButton = document.createElement("button");
    editButton.className = "action-btn edit-achievement";
    editButton.textContent = "Edit";
    editButton.dataset.id = achievement.id;

    const deleteButton = document.createElement("button");
    deleteButton.className = "action-btn delete-achievement";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = achievement.id;

    actions.append(editButton, deleteButton);

    item.append(info, actions);
    container.appendChild(item);
  });
}

// =====================================
// 9. TOAST NOTIFICATIONS
// =====================================

function showToast(message, isError = false) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = isError ? "toast error" : "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// =====================================
// 11. LOAD PROJECTS
// =====================================

async function loadProjects() {
  try {
    const result = await fetchAPI("/projects");

    displayAdminProjects(result.data);

    document.getElementById("project-count").textContent =
      `${result.data.length} projects`;
  } catch (error) {
    console.error("Projects Error:", error);
    showToast("Unable to load projects", true);
  }
}

// =====================================
// 12. DISPLAY PROJECTS IN ADMIN
// =====================================

function displayAdminProjects(projects) {
  const container = document.getElementById("admin-projects-list");

  container.replaceChildren();

  if (projects.length === 0) {
    container.textContent = "No projects added yet.";
    return;
  }

  projects.forEach((project) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const info = document.createElement("div");
    info.className = "admin-item-info";

    const name = document.createElement("h3");
    name.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("span");
    technologies.className = "admin-item-tag";
    technologies.textContent = (project.technologies || []).join(", ");

    info.append(name, description, technologies);

    const actions = document.createElement("div");
    actions.className = "admin-item-actions";

    const editButton = document.createElement("button");
    editButton.className = "action-btn edit-project";
    editButton.textContent = "Edit";
    editButton.dataset.id = project.id;

    const deleteButton = document.createElement("button");
    deleteButton.className = "action-btn delete-project";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = project.id;

    actions.append(editButton, deleteButton);

    item.append(info, actions);

    container.appendChild(item);
  });
}

// =====================================
// 13. LOAD SKILLS
// =====================================

async function loadSkills() {
  try {
    const result = await fetchAPI("/skills");

    displayAdminSkills(result.data);

    document.getElementById("skill-count").textContent =
      `${result.data.length} skills`;
  } catch (error) {
    console.error("Skills Error:", error);
    showToast("Unable to load skills", true);
  }
}

// =====================================
// 14. DISPLAY SKILLS IN ADMIN
// =====================================

function displayAdminSkills(skills) {
  const container = document.getElementById("admin-skills-list");

  container.replaceChildren();

  if (skills.length === 0) {
    container.textContent = "No skills added yet.";
    return;
  }

  skills.forEach((skill) => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const info = document.createElement("div");
    info.className = "admin-item-info";

    const name = document.createElement("h3");
    name.textContent = skill.name;

    const category = document.createElement("span");
    category.className = "admin-item-tag";
    category.textContent = skill.category;

    info.append(name, category);

    const actions = document.createElement("div");
    actions.className = "admin-item-actions";

    const editButton = document.createElement("button");
    editButton.className = "action-btn edit-skill";
    editButton.textContent = "Edit";
    editButton.dataset.id = skill.id;

    const deleteButton = document.createElement("button");
    deleteButton.className = "action-btn delete-skill";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = skill.id;

    actions.append(editButton, deleteButton);

    item.append(info, actions);

    container.appendChild(item);
  });
}

// =====================================
// 15. LOAD ALL MANAGEMENT DATA
// =====================================

async function loadManagementData() {
  await Promise.all([loadProjects(), loadSkills()]);
}

// =====================================
// 16. UPDATE INITIALIZATION
// =====================================

initializeDashboard = async function () {
  await checkAPIConnection();
  await loadDashboard();
  await loadManagementData();
};

async function startDashboard() {
    const isAuthenticated = await checkAdminAuthentication();

    if (isAuthenticated) {
        document.body.classList.remove("auth-checking");
        initializeDashboard();
    }
}

startDashboard();

// =====================================
// 17. SIDEBAR NAVIGATION
// =====================================

const navItems = document.querySelectorAll(".nav-item");
const pageViews = document.querySelectorAll(".page-view");

const pageTitles = {
  overview: "Overview",
  projects: "Projects",
  skills: "Skills",
  achievements: "Achievements",
  settings: "Settings",
};

function switchView(viewName) {
  // Remove active class from all navigation buttons
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Hide all dashboard pages
  pageViews.forEach((view) => {
    view.classList.remove("active");
  });

  // Activate selected navigation button
  const selectedNav = document.querySelector(
    `.nav-item[data-view="${viewName}"]`,
  );

  if (selectedNav) {
    selectedNav.classList.add("active");
  }

  // Show selected page
  const selectedView = document.getElementById(`${viewName}-view`);

  if (selectedView) {
    selectedView.classList.add("active");
  }

  // Update page heading
  document.getElementById("page-title").textContent =
    pageTitles[viewName] || viewName;

  document.getElementById("breadcrumb-current").textContent =
    pageTitles[viewName] || viewName;

  // Close mobile sidebar after selection
  document.getElementById("sidebar").classList.remove("open");
}

// Sidebar click events
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const viewName = item.dataset.view;

    switchView(viewName);
  });
});

// Overview quick-action navigation
document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.viewTarget);
  });
});

// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// =====================================
// 18. PROJECT MODAL
// =====================================

let editingProjectId = null;

const projectModal = document.getElementById("project-modal");
const projectForm = document.getElementById("project-form");

function openProjectModal(project = null) {
  projectForm.reset();

  if (project) {
    editingProjectId = project.id;

    document.getElementById("project-modal-title").textContent = "Edit Project";

    document.getElementById("project-submit-btn").textContent =
      "Update Project";

    document.getElementById("project-name").value = project.name;

    document.getElementById("project-description").value = project.description;

    document.getElementById("project-technologies").value = (
      project.technologies || []
    ).join(", ");

    document.getElementById("project-github").value = project.github || "";

    document.getElementById("project-demo").value = project.demo || "";
  } else {
    editingProjectId = null;

    document.getElementById("project-modal-title").textContent = "Add Project";

    document.getElementById("project-submit-btn").textContent = "Save Project";
  }

  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");
}

// Open Add Project modal
document.getElementById("add-project-btn").addEventListener("click", () => {
  openProjectModal();
});

document.getElementById("quick-add-project").addEventListener("click", () => {
  openProjectModal();
});

// Close modals
document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.dataset.closeModal;
    const modal = document.getElementById(modalId);

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });
});

// Close modal when clicking outside its content
document.querySelectorAll(".modal-overlay").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});

// Close modal using Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal-overlay.active").forEach((modal) => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    });
  }
});

// =====================================
// 19. SAVE PROJECT
// =====================================

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const project = {
    name: document.getElementById("project-name").value.trim(),

    description: document.getElementById("project-description").value.trim(),

    technologies: document
      .getElementById("project-technologies")
      .value.split(",")
      .map((tech) => tech.trim())
      .filter(Boolean),

    github: document.getElementById("project-github").value.trim(),

    demo: document.getElementById("project-demo").value.trim(),
  };

  const isEditing = editingProjectId !== null;

  const endpoint = isEditing ? `/projects/${editingProjectId}` : "/projects";

  const method = isEditing ? "PUT" : "POST";

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: method,

      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(project),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to save project");
    }

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    showToast(isEditing ? "Project updated!" : "Project added!");

    await loadManagementData();
    await loadDashboard();
  } catch (error) {
    console.error("Save Project Error:", error);
    showToast(error.message, true);
  }
});

// =====================================
// 20. EDIT AND DELETE PROJECTS
// =====================================

// Handle Edit and Delete button clicks
document
  .getElementById("admin-projects-list")
  .addEventListener("click", async (event) => {
    const editButton = event.target.closest(".edit-project");
    const deleteButton = event.target.closest(".delete-project");

    // EDIT PROJECT
    if (editButton) {
      const projectId = editButton.dataset.id;

      try {
        const result = await fetchAPI("/projects");

        const project = result.data.find(
          (item) => String(item.id) === String(projectId),
        );

        if (!project) {
          throw new Error("Project not found");
        }

        openProjectModal(project);
      } catch (error) {
        console.error(error);
        showToast(error.message, true);
      }
    }

    // DELETE PROJECT
    if (deleteButton) {
      const projectId = deleteButton.dataset.id;

      const confirmed = confirm(
        "Are you sure you want to delete this project?",
      );

      if (!confirmed) return;

      try {
        const response = await fetch(`${API_URL}/projects/${projectId}`, {
          method: "DELETE",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Delete failed");
        }

        showToast("Project deleted successfully!");

        await loadManagementData();
        await loadDashboard();
      } catch (error) {
        console.error(error);
        showToast(error.message, true);
      }
    }
  });

// =====================================
// 21. SKILL MODAL
// =====================================

let editingSkillId = null;

const skillModal = document.getElementById("skill-modal");
const skillForm = document.getElementById("skill-form");

function openSkillModal(skill = null) {
  skillForm.reset();

  if (skill) {
    editingSkillId = skill.id;

    document.getElementById("skill-modal-title").textContent = "Edit Skill";

    document.getElementById("skill-submit-btn").textContent = "Update Skill";

    document.getElementById("skill-name").value = skill.name;

    document.getElementById("skill-category").value = skill.category;
  } else {
    editingSkillId = null;

    document.getElementById("skill-modal-title").textContent = "Add Skill";

    document.getElementById("skill-submit-btn").textContent = "Save Skill";
  }

  skillModal.classList.add("active");
  skillModal.setAttribute("aria-hidden", "false");
}

// Open Add Skill modal
document.getElementById("add-skill-btn").addEventListener("click", () => {
  openSkillModal();
});

document.getElementById("quick-add-skill").addEventListener("click", () => {
  openSkillModal();
});

// =====================================
// 22. SAVE SKILL
// =====================================

skillForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const skill = {
    name: document.getElementById("skill-name").value.trim(),

    category: document.getElementById("skill-category").value.trim(),
  };

  const isEditing = editingSkillId !== null;

  const endpoint = isEditing ? `/skills/${editingSkillId}` : "/skills";

  const method = isEditing ? "PUT" : "POST";

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,

      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(skill),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to save skill");
    }

    skillModal.classList.remove("active");
    skillModal.setAttribute("aria-hidden", "true");

    showToast(isEditing ? "Skill updated!" : "Skill added!");

    await loadManagementData();
    await loadDashboard();
  } catch (error) {
    console.error("Skill Error:", error);
    showToast(error.message, true);
  }
});

// =====================================
// 23. EDIT AND DELETE SKILLS
// =====================================

document
  .getElementById("admin-skills-list")
  .addEventListener("click", async (event) => {
    const editButton = event.target.closest(".edit-skill");
    const deleteButton = event.target.closest(".delete-skill");

    // EDIT SKILL
    if (editButton) {
      const skillId = editButton.dataset.id;

      try {
        const result = await fetchAPI("/skills");

        const skill = result.data.find(
          (item) => String(item.id) === String(skillId),
        );

        if (!skill) {
          throw new Error("Skill not found");
        }

        openSkillModal(skill);
      } catch (error) {
        console.error(error);
        showToast(error.message, true);
      }
    }

    // DELETE SKILL
    if (deleteButton) {
      const skillId = deleteButton.dataset.id;

      const confirmed = confirm("Are you sure you want to delete this skill?");

      if (!confirmed) return;

      try {
        const response = await fetch(`${API_URL}/skills/${skillId}`, {
          method: "DELETE",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Delete failed");
        }

        showToast("Skill deleted successfully!");

        await loadManagementData();
        await loadDashboard();
      } catch (error) {
        console.error(error);
        showToast(error.message, true);
      }
    }
  });

// =====================================
// 24. ACHIEVEMENT MODAL
// =====================================

let editingAchievementId = null;

const achievementModal = document.getElementById("achievement-modal");

const achievementForm = document.getElementById("achievement-form");

function openAchievementModal(achievement = null) {
  achievementForm.reset();

  if (achievement) {
    editingAchievementId = achievement.id;

    document.getElementById("achievement-modal-title").textContent =
      "Edit Achievement";

    document.getElementById("achievement-submit-btn").textContent =
      "Update Achievement";

    document.getElementById("achievement-name").value = achievement.name;
  } else {
    editingAchievementId = null;

    document.getElementById("achievement-modal-title").textContent =
      "Add Achievement";

    document.getElementById("achievement-submit-btn").textContent =
      "Save Achievement";
  }

  achievementModal.classList.add("active");
  achievementModal.setAttribute("aria-hidden", "false");
}

// Open Add Achievement
document.getElementById("add-achievement-btn").addEventListener("click", () => {
  openAchievementModal();
});

// Save or Update Achievement
achievementForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const achievement = {
    name: document.getElementById("achievement-name").value.trim(),
  };

  const isEditing = editingAchievementId !== null;

  const endpoint = isEditing
    ? `/achievements/${editingAchievementId}`
    : "/achievements";

  const method = isEditing ? "PUT" : "POST";

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(achievement),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to save achievement");
    }

    achievementModal.classList.remove("active");
    achievementModal.setAttribute("aria-hidden", "true");

    showToast(isEditing ? "Achievement updated!" : "Achievement added!");

    await loadDashboard();
  } catch (error) {
    console.error(error);
    showToast(error.message, true);
  }
});

// Edit and Delete Achievement
document
  .getElementById("admin-achievements-list")
  .addEventListener("click", async (event) => {
    const editButton = event.target.closest(".edit-achievement");
    const deleteButton = event.target.closest(".delete-achievement");

    // EDIT
    if (editButton) {
      try {
        const result = await fetchAPI("/achievements");

        const achievement = result.data.find(
          (item) => String(item.id) === String(editButton.dataset.id),
        );

        if (!achievement) {
          throw new Error("Achievement not found");
        }

        openAchievementModal(achievement);
      } catch (error) {
        showToast(error.message, true);
      }
    }

    // DELETE
    if (deleteButton) {
      const confirmed = confirm(
        "Are you sure you want to delete this achievement?",
      );

      if (!confirmed) return;

      try {
        const response = await fetch(
          `${API_URL}/achievements/${deleteButton.dataset.id}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Delete failed");
        }

        showToast("Achievement deleted!");

        await loadDashboard();
      } catch (error) {
        showToast(error.message, true);
      }
    }
  });

const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Unable to log out");
    }

    window.location.href = "login.html";
  } catch (error) {
    showToast(error.message, true);
  }
});
