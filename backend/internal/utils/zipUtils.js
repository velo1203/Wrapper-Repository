const unzipper = require("unzipper");
const fs = require("fs"); // fs의 Promise API를 사용합니다.
const path = require("path");

exports.extractZipContents = async function (zipPath, extractPath) {
    return new Promise((resolve, reject) => {
        let topFolderName = null;

        fs.createReadStream(zipPath)
            .pipe(unzipper.Parse())
            .on("entry", async (entry) => {
                if (topFolderName === null) {
                    const parts = entry.path.split("/");
                    topFolderName = parts[0];
                }

                const entryPath = entry.path.replace(new RegExp(`^${topFolderName}/`), "");
                const fullPath = path.join(extractPath, entryPath);

                if (entry.type === "Directory") {
                    await fs.promises.mkdir(fullPath, { recursive: true });
                    entry.autodrain();
                } else {
                    const directory = path.dirname(fullPath);
                    try {
                        await fs.promises.mkdir(directory, { recursive: true });
                    } catch (err) {
                        // 디렉토리 생성 중 오류 처리 (디렉토리가 이미 존재하는 경우 무시)
                        if (err.code !== 'EEXIST') throw err;
                    }
                    entry.pipe(fs.createWriteStream(fullPath)).on('error', reject);
                }
            })
            .on("error", reject)
            .on("finish", resolve);
    });
};
