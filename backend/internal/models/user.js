class User {
    constructor(db) {
        this.db = db;
    }

    // 사용자 찾기
    findByUsername(username, callback) {
        return this.db.get(
            "SELECT * FROM users WHERE username = ?",
            [username],
            function (err, row) {
                callback(err, row);
            }
        );
    }

    findByUserId(userId, callback) {
        return this.db.get(
            "SELECT * FROM users WHERE id = ?",
            [userId],
            function (err, row) {
                callback(err, row);
            }
        );
    }

    findByEmail(email, callback) {
        return this.db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            function (err, row) {
                callback(err, row);
            }
        );
    }

    // 사용자 추가
    createUser(email, username, password, callback) {
        return this.db.run(
            "INSERT INTO users (username, password,email) VALUES (?, ?, ?)",
            [username, password, email],
            function (err) {
                callback(err, this.lastID);
            }
        );
    }
}

module.exports = User;
