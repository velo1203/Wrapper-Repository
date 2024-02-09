const courseController = require("../controllers/courseController");
const express = require("express");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const router = express.Router();

// 코스 생성을 위한 POST 엔드포인트
router.post("/", authenticateAdmin, async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await courseController.createCourse(title, description);
        res.json({ courseId: result.courseId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 코스 삭제를 위한 DELETE 엔드포인트
router.delete("/:id", authenticateAdmin, async (req, res) => {
    try {
        const result = await courseController.deleteCourse(req.params.id);
        res.json({ message: result.message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 모든 코스 조회를 위한 GET 엔드포인트
router.get("/", async (req, res) => {
    try {
        const result = await courseController.findAllCourses();
        res.json({ courses: result.courses });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
