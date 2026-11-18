
// =====================================
// 1. API CONFIGURATION
// =====================================

const API_URL = "http://localhost:5000/api";

// =====================================
// 2. DOM ELEMENTS
// =====================================

const apiStatus = document.getElementById("api-status");
const settingsApiStatus = document.getElementById("settings-api-status");

// =====================================
// 3. FETCH HELPER
// =====================================

async function fetchAPI(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);

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

    document.getElementById("total-skills").textContent =
        portfolio.skills.length;

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

    projects.slice(0, 4).forEach(project => {

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

    achievements.forEach(achievement => {

        const item = document.createElement("div");
        item.className = "admin-item";

        const info = document.createElement("div");
        info.className = "admin-item-info";

        const name = document.createElement("h3");
        name.textContent = achievement;

        info.appendChild(name);
        item.appendChild(info);

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

    projects.forEach(project => {

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
        technologies.textContent =
            (project.technologies || []).join(", ");

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

    skills.forEach(skill => {

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

    await Promise.all([
        loadProjects(),
        loadSkills()
    ]);

}


// =====================================
// 16. UPDATE INITIALIZATION
// =====================================

initializeDashboard = async function () {

    await checkAPIConnection();
    await loadDashboard();
    await loadManagementData();

};

initializeDashboard();


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
    settings: "Settings"
};

function switchView(viewName) {

    // Remove active class from all navigation buttons
    navItems.forEach(item => {
        item.classList.remove("active");
    });

    // Hide all dashboard pages
    pageViews.forEach(view => {
        view.classList.remove("active");
    });

    // Activate selected navigation button
    const selectedNav = document.querySelector(
        `.nav-item[data-view="${viewName}"]`
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
navItems.forEach(item => {

    item.addEventListener("click", () => {

        const viewName = item.dataset.view;

        switchView(viewName);

    });

});


// Overview quick-action navigation
document.querySelectorAll("[data-view-target]").forEach(button => {

    button.addEventListener("click", () => {

        switchView(button.dataset.viewTarget);

    });

});


// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {

    document.getElementById("sidebar").classList.toggle("open");

});
