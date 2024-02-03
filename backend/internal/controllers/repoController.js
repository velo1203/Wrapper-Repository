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

exports.GetRepository = (repositoryId, callback) => {
    // repository.findById 메서드를 호출하여 레포지토리를 조회하고, 결과를 콜백 함수에 전달
    repository.findById(repositoryId, (error, row) => {
        if (error) {
            callback(error, null);
        } else {
            // 콜백에 결과 데이터 전달
            callback(null, row);
        }
    });
};

// 레포지토리를 삭제하는 함수
exports.DeleteRepository = (repositoryId, userID, callback) => {
    // 먼저 레포지토리를 조회
    repository.findById(repositoryId, (error, repo) => {
        // 조회 중 오류가 발생하면 콜백 함수에 오류를 전달
        if (error) return callback(error);
        // 레포지토리가 없으면 오류를 생성하고 콜백 함수에 전달
        if (!repo) return callback(new Error("Repository not found"));
        // 레포지토리의 소유자가 아니면 오류를 생성하고 콜백 함수에 전달
        if (repo.user_id !== userID) return callback(new Error("Unauthorized"));
        // 레포지토리를 삭제
        repository.deleteRepository(repositoryId, userID, (error) => {
            // 삭제 중 오류가 발생하면 콜백 함수에 오류를 전달
            if (error) return callback(error);
            // 사용자를 조회
            user.findByUserId(userID, (error, user) => {
                // 조회 중 오류가 발생하면 콜백 함수에 오류를 전달
                if (error) return callback(error);
                // 삭제할 레포지토리의 파일 시스템 경로를 생성
                const repoPath = path.join(
                    process.cwd(),
                    "cmd",
                    "repository",
                    user.username,
                    repo.name
                );
                // 파일 시스템에서 레포지토리를 삭제
                fs.rm(repoPath, { recursive: true }, (err) => {
                    // 삭제 중 오류가 발생하면 콜백 함수에 오류를 전달
                    if (err) return callback(err);
                    // 모든 작업이 성공적으로 완료되면 콜백 함수를 오류 없이 호출
                    callback(null);
                });
            });
        });
    });
};

// 사용자 ID로 해당 사용자의 모든 레포지토리를 조회하는 함수
exports.GetRepositoryByUserId = (userId, callback) => {
    // repository.findAll 메서드를 호출하여 레포지토리를 조회하고, 결과를 콜백 함수에 전달
    repository.findAll(userId, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            // 콜백에 결과 데이터 전달
            callback(null, rows);
        }
    });
};
