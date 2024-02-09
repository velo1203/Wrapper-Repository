const express = require("express");
const repositoryController = require("../controllers/repoController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const { postRepoModel } = require("../requestmodel/repoModel");
const path = require("path");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
router.post("/", authenticate, upload.single("zipfile"), async (req, res) => {
    try {
        const request = new postRepoModel(req.body);
        request.validate();

        const { message, repositoryId } =
            await repositoryController.CreateRepository(
                req.body.name,
                req.body.description,
                req.user.id,
                req.file
            );

        res.json({ message, repositoryId });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

router.get("/", authenticate, async (req, res) => {
    try {
        const repositories = await repositoryController.GetRepositoryByUserId(
            req.user.id
        );
        res.json(repositories);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        await repositoryController.DeleteRepository(req.params.id, req.user.id);
        res.json({ message: "Repository deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

module.exports = router;
