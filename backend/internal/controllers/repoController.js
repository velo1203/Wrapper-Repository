const db = require("../database/db"); // 데이터베이스 연결 설정
const Repository = require("../models/repository"); // Repository 모델
const User = require("../models/user"); // User 모델
const user = new User(db); // User 클래스의 인스턴스 생성
const repository = new Repository(db); // Repository 클래스의 인스턴스 생성
const path = require("path");
const { deleteTempFile } = require("../utils/fileUtils");
const { extractZipContents } = require("../utils/zipUtils");
const fs = require("fs");

// 레포지토리 생성
// 레포지토리 생성 함수
exports.CreateRepository = (name, description, userId, zipfile, callback) => {
    // 레포지토리 이름으로 중복 검사
    repository.findByName(name, userId, (err, existingRepository) => {
        if (err) return callback(err);
        if (existingRepository)
            return callback(new Error("Repository already exists"));

        user.findByUserId(userId, (err, user) => {
            if (err) return callback(err);
            if (!user) return callback(new Error("User not found"));
            const repoPath = path.join(
                process.cwd(),
                "cmd",
                "repository",
                user.username,
                name
            );
            extractZipContents(zipfile.path, repoPath, (err) => {
                if (err) return callback(err);

                // 압축 해제가 완료되면 데이터베이스에 레포지토리 정보 저장
                repository.createRepository(
                    name,
                    description,
                    userId,
                    (err, repositoryId) => {
                        if (err) return callback(err);

                        // 임시 업로드 파일 삭제
                        deleteTempFile(zipfile.path, (err) => {
                            if (err) return callback(err);

                            // 성공적으로 레포지토리 생성 및 처리 완료
                            callback(null, {
                                message: "Repository created successfully",
                                repositoryId,
                            });
                        });
                    }
                );
            });
        });
        // 중복 레포지토리가 없는 경우, 레포지토리 생성 및 ZIP 파일 압축 해제
    });
};

// 레포지토리 조회
exports.GetRepository = (repositoryId, callback) => {
    // 레포지토리 ID로 레포지토리 조회
    repository.findById(repositoryId, callback);
};

exports.DeleteRepository = (repositoryId, userID, callback) => {
    repository.findById(repositoryId, (error, repo) => {
        if (error) return callback(error);
        if (!repo) return callback(new Error("Repository not found"));
        if (repo.user_id !== userID) return callback(new Error("Unauthorized"));
        repository.deleteRepository(repositoryId, userID, (error) => {
            if (error) return callback(error);
            user.findByUserId(userID, (error, user) => {
                if (error) return callback(error);
                const repoPath = path.join(
                    process.cwd(),
                    "cmd",
                    "repository",
                    user.username,
                    repo.name
                );
                fs.rm(repoPath, { recursive: true }, (err) => {
                    if (err) return callback(err);
                    callback(null);
                });
            });
        });
    });
};

exports.GetRepositoryByUserId = (userId, callback) => {
    repository.findAll(userId, callback);
};
