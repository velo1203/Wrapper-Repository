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

router.delete("/repository/:id", authenticate, (req, res) => {
    try {
        const repoID = req.params.id;

        repositoryController.DeleteRepository(repoID, req.user.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Repository deleted successfully" });
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;
