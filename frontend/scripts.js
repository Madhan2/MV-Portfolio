// Find the HTML element where the text should appear
const typingElement = document.getElementById("typing-text");

// Words to display
const words = [
  "Cybersecurity Enthusiast",
  "CSE Student",
  "Full Stack Developer",
  "Aspiring Ethical Hacker",
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  // Add or remove one character
  if (isDeleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  // Display the current text
  typingElement.textContent = currentWord.substring(0, characterIndex);

  // Decide whether to type or delete
  let delay = isDeleting ? 60 : 50;

  // Once the word is complete, pause and start deleting
  if (!isDeleting && characterIndex === currentWord.length) {
    delay = 1200;
    isDeleting = true;
  }

  // Once the word is deleted, move to the next word
  else if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

// Start the animation
typeEffect();

// Backend API address
const API_URL = "http://localhost:5000/api";

// Fetch portfolio information
async function loadPortfolio() {
  try {
    const response = await fetch(`${API_URL}/portfolio`);

    // Check whether the request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch portfolio data");
    }

    // Convert JSON response into JavaScript data
    const result = await response.json();

    // Extract portfolio information
    const portfolio = result.data;
    updateStats(portfolio);

function updateStats(portfolio) {

    document.getElementById("stat-projects").textContent =
        portfolio.projects.length;

    document.getElementById("stat-skills").textContent =
        portfolio.skills.length;

    document.getElementById("stat-achievements").textContent =
        portfolio.achievements.length;

}

    // Display the information
    displaySkills(portfolio.skills);
    displayProjects(portfolio.projects);
    displayAchievements(portfolio.achievements);
  } catch (error) {
    console.error("Error loading portfolio:", error);

    document.getElementById("skills-container").textContent =
      "Unable to load skills.";

    document.getElementById("projects-container").textContent =
      "Unable to load projects.";

    document.getElementById("achievements-container").textContent =
      "Unable to load achievements.";
  }
}

// Display skills grouped by category
function displaySkills(skills) {
  const container = document.getElementById("skills-container");
  container.replaceChildren();

  const categories = {};

  skills.forEach((skill) => {
    if (!categories[skill.category]) {
      categories[skill.category] = [];
    }

    categories[skill.category].push(skill);
  });

  Object.keys(categories).forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "skill-category";

    const heading = document.createElement("h3");
    heading.textContent = category;

    const grid = document.createElement("div");
    grid.className = "skills-grid";

    categories[category].forEach((skill) => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = skill.name;

      grid.appendChild(card);
    });

    categoryDiv.append(heading, grid);
    container.appendChild(categoryDiv);
  });
}

// Display projects
function displayProjects(projects) {
  const container = document.getElementById("projects-container");
  container.replaceChildren();

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    heading.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("p");
    technologies.textContent =
      "Technologies: " + (project.technologies || []).join(", ");

    card.append(heading, description, technologies);

    // Add GitHub link if available
    if (project.github) {
      const link = document.createElement("a");
      link.textContent = "View GitHub";
      link.href = project.github;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.appendChild(link);
    }

    // Add demo link if available
    if (project.demo) {
      const link = document.createElement("a");
      link.textContent = "Live Demo";
      link.href = project.demo;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.appendChild(link);
    }

    container.appendChild(card);
  });
}

// Display achievements

function displayAchievements(achievements) {
    const container = document.getElementById("achievements-container");

    container.replaceChildren();

    achievements.forEach(achievement => {
        const card = document.createElement("div");
        card.className = "achievement-card";

        const icon = document.createElement("div");
        icon.className = "achievement-icon";
        icon.textContent = "✦";

        const content = document.createElement("p");
        content.textContent = achievement.name;

        card.append(icon, content);
        container.appendChild(card);
    });
}

// Load everything when the page opens
loadPortfolio();
