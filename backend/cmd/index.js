const express = require("express");
const authRouter = require("../internal/routes/authRouter");
const repositoryRouter = require("../internal/routes/repoRouter");
const userRepoRouter = require("../internal/routes/userRepoRouter");
const authenticate = require("../internal/middleware/authenticate");
const errorHandler = require("../internal/middleware/errorHandler");
const logRequest = require("../internal/middleware/log_request");
const path = require("path");
const app = express();
const port = 5000;

app.use(express.json()); // JSON 요청 본문 파싱을 위한 미들웨어
app.use(logRequest); // 로그 미들웨어 등록
app.use(errorHandler); // 에러 핸들러 미들웨어 등록
app.use("/api/", authRouter); // 인증 라우터 등록
app.use("/api/", repositoryRouter);
app.use(userRepoRouter);

app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));
app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "..", "frontend", "build", "index.html")
    );
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`);
});
