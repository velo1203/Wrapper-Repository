// 필요한 모듈 불러오기
const bcrypt = require("bcrypt"); // 비밀번호를 해싱하기 위한 bcrypt 모듈
const jwt = require("jsonwebtoken"); // JWT 토큰을 생성하고 검증하기 위한 jsonwebtoken 모듈
require("dotenv").config({ path: "cmd/.env" }); // .env 파일에서 환경변수 불러오기
const User = require("../models/user"); // 사용자 모델
const db = require("../database/db"); // 데이터베이스 연결 설정
const user = new User(db); // User 클래스의 인스턴스 생성

const secretKey = process.env.JWT_SECRET; // JWT 토큰 생성 시 사용할 시크릿 키

// 회원가입 기능
exports.register = (email, username, password, callback) => {
    // 사용자를 찾아 중복 검사
    user.findByEmail(email, (err, existingUser) => {
        if (err) return callback(err); // 데이터베이스 조회 중 에러 발생 시 콜백으로 에러 전달
        if (existingUser) return callback(new Error("User already exists")); // 사용자가 이미 존재할 경우 에러 처리
        // 중복 사용자가 없는 경우 비밀번호 해싱
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback(err); // 해싱 과정에서 에러 발생 시 콜백으로 에러 전달
            // 해싱된 비밀번호를 사용하여 사용자 생성
            user.createUser(email, username, hash, callback);
        });
    });
};

// 로그인 기능
exports.login = (email, password, callback) => {
    // 사용자 이름으로 사용자 검색
    user.findByEmail(email, (err, user) => {
        if (err) return callback(err); // 데이터베이스 조회 중 에러 발생 시 콜백으로 에러 전달
        if (!user) return callback(new Error("User not found")); // 사용자가 존재하지 않을 경우 에러 처리
        // bcrypt를 이용해 제공된 비밀번호와 저장된 해싱된 비밀번호 비교
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return callback(err); // 비교 과정에서 에러 발생 시 콜백으로 에러 전달
            if (!result) return callback(new Error("Wrong password")); // 비밀번호 불일치 시 에러 처리

            // 비밀번호가 일치하면 JWT 토큰 생성
            const token = jwt.sign(
                { id: user.id, email: user.email }, // 토큰에 포함될 사용자 정보
                secretKey, // 시크릿 키
                { expiresIn: "1h" } // 토큰 유효 시간 설정
            );
            // 생성된 토큰을 콜백으로 전달
            callback(null, token, user.username);
        });
    });
};
