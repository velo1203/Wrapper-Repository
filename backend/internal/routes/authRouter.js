// 필요한 모듈을 불러옵니다.
const express = require("express"); // Express 프레임워크
const authController = require("../controllers/authController"); // 인증 서비스 로직이 정의된 모듈
const router = express.Router(); // 새 Express 라우터 인스턴스를 생성합니다.
const {
    loginRequestModel,
    registerRequestModel,
} = require("../requestmodel/authModel");
const authenticateAdmin = require("../middleware/authenticateAdmin");

// 회원가입을 위한 POST 엔드포인트
router.post("/register", async (req, res) => {
    try {
        const request = new registerRequestModel(req.body);
        request.validate();

        const result = await authController.register(
            req.body.email,
            req.body.username,
            req.body.password
        );

        res.json({
            message: "User registered successfully",
            userId: result.userId,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 로그인을 위한 POST 엔드포인트
router.post("/login", async (req, res) => {
    try {
        const request = new loginRequestModel(req.body);
        request.validate();

        const { token, username } = await authController.login(
            req.body.email,
            req.body.password
        );

        res.json({
            message: "Logged in successfully",
            token,
            username,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

router.get("/user/:id", authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await authController.getUser(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
