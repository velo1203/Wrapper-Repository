require("dotenv").config({ path: "cmd/.env" }); // .env 파일에서 환경변수 불러오기
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; // JWT 토큰 생성 시 사용할 시크릿 키

// JWT 토큰을 검증하고 어드민 권한을 확인하는 미들웨어 함수
const authenticateAdmin = (req, res, next) => {
    // 요청 헤더에서 'Authorization' 값 가져오기
    const authHeader = req.headers["authorization"];
    // 'Bearer TOKEN' 형태에서 토큰 부분만 추출
    const token = authHeader && authHeader.split(" ")[1];

    // 토큰이 없는 경우, 401 Unauthorized 응답
    if (!token) {
        return res.sendStatus(401);
    }

    // 토큰 검증
    jwt.verify(token, secretKey, (err, decoded) => {
        // 토큰이 유효하지 않거나 만료된 경우, 403 Forbidden 응답
        if (err) {
            return res.sendStatus(403); // 403 Forbidden
        }

        // 토큰은 유효하지만, decoded된 페이로드 내의 role이 'admin'이 아닌 경우, 403 Forbidden 응답
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin role required." });
        }

        // 토큰이 유효하고, 사용자가 어드민인 경우, decoded 정보를 req.user에 할당하고 다음 미들웨어로 이동
        req.user = decoded;
        next();
    });
};

module.exports = authenticateAdmin;
