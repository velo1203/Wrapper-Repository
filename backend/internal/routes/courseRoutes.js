const courseController = require("../controllers/courseController");
const express = require("express");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const router = express.Router();
const upload = require("../utils/UploadPublic");

// 코스 생성을 위한 POST 엔드포인트
router.post(
    "/",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const { title, description } = req.body;
            const image = req.file; // multer를 통해 업로드된 이미지 파일 정보

            // 이미지 파일이 제대로 업로드되었는지 확인
            if (!image) {
                return res
                    .status(400)
                    .json({ error: "Image file is required" });
            }

            // 이미지 경로를 포함하여 코스 생성
            const result = await courseController.createCourse(
                title,
                description,
                image.path
            );
            res.json({ courseId: result.courseId, imagePath: image.path });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

// 코스 수정을 위한 PUT 엔드포인트
router.put(
    "/:id",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const image = req.file; // multer를 통해 업로드된 이미지 파일 정보
            const result = await courseController.updateCourse(
                id,
                title,
                description,
                image ? image.path : null
            );
            res.json({ message: result.message });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

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

// 특정 코스 조회를 위한 GET 엔드포인트
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await courseController.findCourseById(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
