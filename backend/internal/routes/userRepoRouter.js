const express = require("express");
const router = express.Router();
const path = require("path");

const repositoryBasePath = path.join(process.cwd(), "cmd", "repository");
router.use("/:username/:projectname", (req, res, next) => {
    const { username, projectname } = req.params;
    const projectPath = path.join(repositoryBasePath, username, projectname);
    console.log(projectPath);

    // 해당 프로젝트 폴더를 정적 리소스로 제공
    express.static(projectPath)(req, res, next);
});

module.exports = router;
