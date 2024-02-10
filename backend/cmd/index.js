const express = require("express");
require("dotenv").config({ path: ".env" }); // .env 파일에서 환경변수 불러오기
const authRouter = require("../internal/routes/authRouter");
const repositoryRouter = require("../internal/routes/repoRouter");
const userRepoRouter = require("../internal/routes/userRepoRouter");
const courseRouter = require("../internal/routes/courseRoutes");
const adminRouter = require("../internal/routes/adminRoutes");
const errorHandler = require("../internal/middleware/errorHandler");
const logRequest = require("../internal/middleware/log_request");
const path = require("path");
const AdminInitial = require("../internal/Bootstrap/setAdmin");
const app = express();
const port = process.env.SERVER_PORT;

AdminInitial();

app.use(express.json()); // JSON 요청 본문 파싱을 위한 미들웨어
app.use(logRequest); // 로그 미들웨어 등록
app.use(errorHandler); // 에러 핸들러 미들웨어 등록
app.use("/api", authRouter); // 인증 라우터 등록
app.use("/api/repository", repositoryRouter);
app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);
app.use(userRepoRouter);
app.use("/uploads", express.static("public/uploads"));

app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));
app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "..", "frontend", "build", "index.html")
    );
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`);
});
