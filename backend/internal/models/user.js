class User {
    constructor(db) {
        this.db = db;
    }

    // 사용자 찾기
    findByUsername(username) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    findByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // 사용자 추가
    createUser(email, username, password) {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }
}

module.exports = User;
