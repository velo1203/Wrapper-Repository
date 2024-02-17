const unzipper = require("unzipper");
const fs = require("fs"); // fs의 Promise API를 사용합니다.
const path = require("path");

exports.extractZipContents = async function (zipPath, extractPath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipPath)
            .pipe(unzipper.Parse())
            .on("entry", async (entry) => {
                const fullPath = path.join(extractPath, entry.path); // 최상위 폴더를 제거하지 않고 전체 경로 사용

                if (entry.type === "Directory") {
                    await fs.promises.mkdir(fullPath, { recursive: true });
                    entry.autodrain();
                } else {
                    const directory = path.dirname(fullPath);
                    try {
                        await fs.promises.mkdir(directory, { recursive: true });
                    } catch (err) {
                        // 디렉토리 생성 중 오류 처리 (디렉토리가 이미 존재하는 경우 무시)
                        if (err.code !== "EEXIST") throw err;
                    }
                    entry
                        .pipe(fs.createWriteStream(fullPath))
                        .on("error", reject);
                }
            })
            .on("error", reject)
            .on("finish", resolve); // 압축 해제 완료 후 최상위 폴더 이름 반환
    });
};
