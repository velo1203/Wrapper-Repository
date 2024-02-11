const express = require("express");
const chapterController = require("../controllers/chapterController");
const router = express.Router();

router.get("/:courseid", async (req, res) => {
    try {
        const courseid = req.params.courseid;
        console.log("courseid", courseid);
        const chapter = await chapterController.findAllChapters(courseid);
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/:courseId", async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const title = req.body.title;
        const chapter = await chapterController.createChapter(courseId, title);
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const chapters = req.body;
        const chapter = await chapterController.updateChapter(chapters, id);
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const chapter = await chapterController.deleteChapter(id);
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
