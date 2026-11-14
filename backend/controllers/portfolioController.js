
const {
    projects,
    skills,
    achievements
} = require("../data/data");

function getPortfolio(req, res) {
    res.status(200).json({
        success: true,
        data: {
            projects,
            skills,
            achievements
        }
    });
}

module.exports = {
    getPortfolio
};

