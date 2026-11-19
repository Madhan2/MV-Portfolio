
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const COOKIE_NAME = "portfolio_admin_token";

function createToken(username) {
    return jwt.sign(
        { username, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
    );
}

// LOGIN
async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        const validUsername =
            username === process.env.ADMIN_USERNAME;

        const validPassword = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH
        );

        if (!validUsername || !validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = createToken(username);

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 8 * 60 * 60 * 1000,
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to process login"
        });
    }
}

// CHECK AUTHENTICATION
function checkAuth(req, res) {
    res.status(200).json({
        success: true,
        authenticated: true,
        username: req.admin.username
    });
}

// LOGOUT
function logout(req, res) {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}

module.exports = {
    login,
    checkAuth,
    logout
};

