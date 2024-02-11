const express = require("express");
const router = express.Router();
const path = require("path");
const { incrementVisits } = require("../controllers/userRepoController");

const repositoryBasePath = path.join(process.cwd(), "cmd", "repository");
router.use("/:username/:projectname", async (req, res, next) => {
    const { username, projectname } = req.params;
    if (req.path === "/") {
        try {
            // 조회수 증가
            await incrementVisits(username, projectname);
        } catch (error) {
            console.error("Error incrementing visits:", error);
        }
    }
    const projectPath = path.join(repositoryBasePath, username, projectname);
    express.static(projectPath)(req, res, next);
});

module.exports = router;
