const express = require("express");
const repositoryController = require("../controllers/repoController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const { postRepoModel } = require("../requestmodel/repoModel");
const path = require("path");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
    "/repository",
    authenticate,
    upload.single("zipfile"),
    (req, res) => {
        try {
            const request = new postRepoModel(req.body);
            request.validate();

            repositoryController.CreateRepository(
                req.body.name,
                req.body.description,
                req.user.id,
                req.file,
                (err, repositoryId) => {
                    if (err)
                        return res.status(500).json({ error: err.message });
                    res.json({
                        message: "Repository created successfully",
                        repositoryId,
                    });
                }
            );
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
);

router.get("/repository", authenticate, (req, res) => {
    try {
        repositoryController.GetRepositoryByUserId(
            req.user.id,
            (err, repository) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(repository);
            }
        );
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

const repositoryBasePath = path.join(process.cwd(), "cmd", "repository");
router.use("/:username/:projectname", (req, res, next) => {
    const { username, projectname } = req.params;
    const projectPath = path.join(repositoryBasePath, username, projectname);

    // 해당 프로젝트 폴더를 정적 리소스로 제공
    express.static(projectPath)(req, res, next);
});

module.exports = router;
