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


const skillCategories = {
    languages: {
        container: "languages-container",
        skills: ["C", "C++", "Java", "Python"]
    },

    tools: {
        container: "tools-container",
        skills: ["Git", "GitHub", "Linux", "VS Code"]
    },
 web: {
        container: "web-container",
        skills: ["HTML", "CSS", "JavaScript"]
    }
};

// Generate cards for each category
Object.values(skillCategories).forEach(category => {

    const container = document.getElementById(category.container);

    category.skills.forEach(skill => {

        const card = document.createElement("div");

        card.className = "card";
        card.textContent = skill;

        container.appendChild(card);
    });

});
