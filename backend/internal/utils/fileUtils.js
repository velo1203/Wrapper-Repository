const fs = require("fs").promises; // fs의 Promise API를 사용합니다.

exports.deleteTempFile = async function (filePath) {
    try {
        await fs.unlink(filePath); // 파일을 비동기적으로 삭제합니다.
        console.log("File deleted successfully");
    } catch (err) {
        console.error("Failed to delete file:", err);
        throw err; // 에러를 호출한 쪽으로 전파합니다.
    }
};
