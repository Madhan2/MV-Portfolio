
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
    const token = req.cookies.portfolio_admin_token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (
            decoded.role !== "admin" ||
            decoded.username !== process.env.ADMIN_USERNAME
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        req.admin = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired session"
        });
    }
}

module.exports = requireAuth;
