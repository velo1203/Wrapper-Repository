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
exports.CreateRepository = async (name, description, userId, zipfile) => {
    try {
        const existingRepository = await repository.findByName(name, userId);
        if (existingRepository) {
            throw new Error("Repository already exists");
        }

        const userFound = await user.findByUserId(userId);
        if (!userFound) {
            throw new Error("User not found");
        }

        const repoPath = path.join(
            process.cwd(),
            "repository",
            userFound.username,
            name
        );
        await extractZipContents(zipfile.path, repoPath);

        const repositoryId = await repository.create(name, description, userId);
        await deleteTempFile(zipfile.path);

        return {
            message: "Repository created successfully",
            repositoryId,
        };
    } catch (err) {
        throw err; // 오류를 호출한 쪽으로 전파
    }
};

// 레포지토리 조회 함수
exports.GetRepository = async (repositoryId) => {
    try {
        const row = await repository.findById(repositoryId);
        return row;
    } catch (error) {
        throw error; // 오류를 호출한 쪽으로 전파
    }
};

exports.GetAllRepositories = async () => {
    try {
        const rows = await repository.findAllRepo();
        return rows;
    } catch (error) {
        throw error; // 오류를 호출한 쪽으로 전파
    }
};

// 레포지토리 삭제 함수
exports.DeleteRepository = async (repositoryId, userID) => {
    try {
        const repo = await repository.findById(repositoryId);
        if (!repo) throw new Error("Repository not found");
        if (repo.user_id !== userID) throw new Error("Unauthorized");

        await repository.delete(repositoryId, userID);

        const userFound = await user.findByUserId(userID);
        const repoPath = path.join(
            process.cwd(),
            "repository",
            userFound.username,
            repo.name
        );
        await fs.promises.rm(repoPath, { recursive: true });
    } catch (error) {
        throw error; // 오류를 호출한 쪽으로 전파
    }
};

// 사용자 ID로 해당 사용자의 모든 레포지토리 조회 함수
exports.GetRepositoryByUserId = async (userId) => {
    try {
        const rows = await repository.findAll(userId);
        return rows;
    } catch (err) {
        throw err; // 오류를 호출한 쪽으로 전파
    }
};
