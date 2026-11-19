const API_URL = "http://127.0.0.1:5000/api";

const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const loginButton = document.getElementById("login-btn");

// Check whether the admin is already logged in
async function checkExistingLogin() {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "admin.html";
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
  }
}

// Handle login form submission
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginError.textContent = "";
  loginButton.disabled = true;
  loginButton.textContent = "Signing in...";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    window.location.href = "admin.html";
  } catch (error) {
    loginError.textContent = error.message;
  } finally {
    loginButton.disabled = false;
    loginButton.innerHTML = "Sign In <span>→</span>";
  }
});

checkExistingLogin();
