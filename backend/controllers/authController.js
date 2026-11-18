
const jwt = require("jsonwebtoken");

function login(req, res) {

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });
    }

    // Verify credentials
    if (
        username !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    // Generate authentication token
    const token = jwt.sign(
        { username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });
}

module.exports = { login };
