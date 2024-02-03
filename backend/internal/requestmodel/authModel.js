class registerRequestModel {
    constructor({ email, password, username }) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
    validate() {
        if (!this.email || !this.password || !this.username) {
            throw Error("email, username and password are required");
        }
        return true;
    }
}

class loginRequestModel {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }
    validate() {
        if (!this.email || !this.password) {
            throw Error("email and password are required");
        }
        return true;
    }
}

module.exports = { loginRequestModel, registerRequestModel }; // 정의된 라우터 모듈을 내보냅니다.
