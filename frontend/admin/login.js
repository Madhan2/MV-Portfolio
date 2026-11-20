
const API_URL = "http://127.0.0.1:5000/api";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("login-error");
    const button = document.getElementById("login-btn");

    console.log("Login page initialized");
    button.addEventListener("click", () => {
    console.log("BUTTON CLICKED");

    console.log("Username:", document.getElementById("username").value);
    console.log("Password entered:", document.getElementById("password").value.length > 0);

    console.log("Form valid:", form.checkValidity());

    if (!form.checkValidity()) {
        form.reportValidity();
    }
});

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        console.log("Login submitted");

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        errorMessage.textContent = "";
        button.disabled = false;
        button.textContent = "Signing in...";

        try {
            console.log("Sending login request");

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ username, password })
            });

            console.log("Response status:", response.status);

            const data = await response.json();

            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            window.location.href = "admin.html";

        } catch (error) {
            console.error("Login failed:", error);
            errorMessage.textContent = error.message;

        } finally {
            button.disabled = false;
            button.textContent = "Sign In →";
        }
    });
});

