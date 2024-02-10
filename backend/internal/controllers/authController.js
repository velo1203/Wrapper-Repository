// 필요한 모듈 불러오기
const bcrypt = require("bcrypt"); // 비밀번호를 해싱하기 위한 bcrypt 모듈
const jwt = require("jsonwebtoken"); // JWT 토큰을 생성하고 검증하기 위한 jsonwebtoken 모듈
require("dotenv").config({ path: "cmd/.env" }); // .env 파일에서 환경변수 불러오기
const User = require("../models/user"); // 사용자 모델
const db = require("../database/db"); // 데이터베이스 연결 설정
const user = new User(db); // User 클래스의 인스턴스 생성

const secretKey = process.env.JWT_SECRET; // JWT 토큰 생성 시 사용할 시크릿 키

// 회원가입 기능
exports.register = async (email, username, password) => {
    try {
        const existingUser = await user.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const role = "user";

        const hash = await bcrypt.hash(password, 10);
        await user.createUser(email, username, hash, role);

        return { message: "User registered successfully" };
    } catch (err) {
        throw err;
    }
};

// 로그인 기능
exports.login = async (email, password) => {
    try {
        const userFound = await user.findByEmail(email);
        if (!userFound) {
            throw new Error("User not found");
        }

        const result = await bcrypt.compare(password, userFound.password);
        if (!result) {
            throw new Error("Wrong password");
        }

        const token = jwt.sign(
            { id: userFound.id, email: userFound.email, role: userFound.role },
            secretKey,
            { expiresIn: "1d" }
        );

        return { token, username: userFound.username, role: userFound.role };
    } catch (err) {
        throw err;
    }
};
