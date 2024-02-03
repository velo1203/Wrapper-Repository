const unzipper = require("unzipper");
const fs = require("fs");
const path = require("path");

/**
 * ZIP 파일의 내용물을 최상위 폴더 없이 지정된 경로에 압축 해제합니다.
 * @param {string} zipPath - 압축 해제할 ZIP 파일의 경로
 * @param {string} extractPath - 내용물이 압축 해제될 경로
 * @param {Function} callback - 압축 해제 완료 또는 에러 시 호출될 콜백 함수
 */
exports.extractZipContents = function (zipPath, extractPath, callback) {
    let topFolderName = null; // 최상위 폴더 이름을 저장할 변수

    fs.createReadStream(zipPath)
        .pipe(unzipper.Parse())
        .on("entry", function (entry) {
            if (topFolderName === null) {
                // 최상위 폴더 이름을 결정합니다.
                const parts = entry.path.split("/");
                topFolderName = parts[0];
            }

            const entryPath = entry.path.replace(topFolderName + "/", ""); // 최상위 폴더 이름을 경로에서 제외
            const fullPath = path.join(extractPath, entryPath); // 최종 파일/폴더 경로

            if (entry.type === "Directory") {
                // 디렉토리의 경우, 해당 경로에 디렉토리를 생성합니다 (최상위 폴더 제외).
                fs.mkdirSync(fullPath, { recursive: true });
                entry.autodrain();
            } else {
                // 파일의 경우, 해당 파일을 저장합니다 (최상위 폴더 제외).
                const directory = path.dirname(fullPath);
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory, { recursive: true });
                }
                entry.pipe(fs.createWriteStream(fullPath));
            }
        })
        .on("error", callback)
        .on("finish", () => callback(null));
};
