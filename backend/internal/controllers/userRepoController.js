const db = require("../database/db"); // 데이터베이스 연결 설정
const Repository = require("../models/repository");
const User = require("../models/user");
const repository = new Repository(db); // User 클래스의 인스턴스 생성
const user = new User(db)


exports.incrementVisits = async (username,repo) => {
    try {
        const Finduser = await user.findByUsername(username)
        if (!Finduser) throw new Error("User not found");
        
        const FindRepository = await repository.findByName(repo,Finduser.id)
        if (!FindRepository) throw new Error("Repository not found");
        await repository.incrementVisits(FindRepository.id);

    } catch (err) {
        throw err;
    }
};
