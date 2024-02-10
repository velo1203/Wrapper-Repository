const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(process.cwd(), "public", "uploads");

// 'uploads' 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// multer를 사용한 파일 스토리지 및 필터링 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/"); // 업로드된 파일이 저장될 서버 내 위치
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름에 현재 날짜를 붙여 중복을 방지
    },
});

// 파일 필터링 설정 - 이미지 파일만 허용
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload only images."), false);
    }
};

// multer 설정을 바탕으로 파일 업로드를 위한 미들웨어 생성
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
