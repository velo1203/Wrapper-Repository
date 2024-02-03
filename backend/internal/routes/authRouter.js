// 필요한 모듈을 불러옵니다.
const express = require("express"); // Express 프레임워크
const authController = require("../controllers/authController"); // 인증 서비스 로직이 정의된 모듈
const router = express.Router(); // 새 Express 라우터 인스턴스를 생성합니다.
const {
    loginRequestModel,
    registerRequestModel,
} = require("../requestmodel/authModel");

// 회원가입을 위한 POST 엔드포인트
router.post("/register", (req, res) => {
    // 클라이언트 요청의 본문에서 사용자 이름과 비밀번호를 추출하여 authController의 register 함수에 전달합니다.
    try {
        const request = new registerRequestModel(req.body);
        request.validate();

        authController.register(
            req.body.email,
            req.body.username,
            req.body.password,
            // 콜백 함수: 회원가입 과정에서 발생하는 결과를 처리합니다.
            (err, userId) => {
                if (err) return res.status(500).json({ error: err.message }); // 에러 발생 시 클라이언트에 500 상태 코드와 에러 메시지를 반환합니다.
                // 성공적으로 사용자가 등록되면, 성공 메시지와 함께 사용자 ID를 반환합니다.
                res.json({ message: "User registered successfully", userId });
            }
        );
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// 로그인을 위한 POST 엔드포인트
router.post("/login", (req, res) => {
    try {
        // 클라이언트 요청의 본문에서 사용자 이름과 비밀번호를 추출하여 authService의 login 함수에 전달합니다.
        const request = new loginRequestModel(req.body);
        request.validate(req.body);
        authController.login(
            req.body.email,
            req.body.password,
            // 콜백 함수: 로그인 과정에서 발생하는 결과를 처리합니다.
            (err, token, username) => {
                if (err) return res.status(401).json({ error: err.message }); // 에러 발생 시 클라이언트에 401 상태 코드와 에러 메시지를 반환합니다.
                // 로그인이 성공적으로 이루어지면, 성공 메시지와 함께 JWT 토큰을 반환합니다.
                res.json({
                    message: "Logged in successfully",
                    token,
                    username,
                });
            }
        );
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router; // 정의된 라우터 모듈을 내보냅니다.
