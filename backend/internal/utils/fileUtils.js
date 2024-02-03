const fs = require("fs");

/**
 * 주어진 경로의 파일을 삭제합니다.
 * @param {string} filePath - 삭제할 파일의 경로
 * @param {Function} callback - 파일 삭제 완료 또는 에러 시 호출될 콜백 함수
 */
exports.deleteTempFile = function (filePath, callback) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Failed to delete file:", err);
            return callback(err);
        }
        callback(null);
    });
};
