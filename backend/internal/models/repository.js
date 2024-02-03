class Repository {
    constructor(db) {
        this.db = db;
    }

    createRepository(name, description, userId, callback) {
        return this.db.run(
            "INSERT INTO repository (name, description, user_id) VALUES (?, ?, ?)",
            [name, description, userId],
            function (err) {
                callback(err, this.lastID);
            }
        );
    }

    findByName(name, userId, callback) {
        return this.db.get(
            "SELECT * FROM repository WHERE name = ? AND user_id = ?",
            [name, userId],
            function (err, row) {
                callback(err, row);
            }
        );
    }

    findById(id, callback) {
        return this.db.get(
            "SELECT * FROM repository WHERE id = ?",
            [id],
            function (err, row) {
                callback(err, row);
            }
        );
    }

    findAll(userId, callback) {
        return this.db.all(
            "SELECT * FROM repository WHERE user_id = ?",
            [userId],
            function (err, rows) {
                callback(err, rows);
            }
        );
    }
}

module.exports = Repository;
