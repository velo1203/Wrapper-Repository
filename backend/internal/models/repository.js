class Repository {
    constructor(db) {
        this.db = db;
    }

    create(name, description, userId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO repository (name, description, user_id) VALUES (?, ?, ?)",
                [name, description, userId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }

    delete(id, userId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "DELETE FROM repository WHERE id = ? AND user_id = ?",
                [id, userId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    findByName(name, userId) {
        return new Promise((resolve, reject) => {
            this.db.get(
                "SELECT * FROM repository WHERE name = ? AND user_id = ?",
                [name, userId],
                function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.get(
                "SELECT * FROM repository WHERE id = ?",
                [id],
                function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    findAll(userId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                "SELECT * FROM repository WHERE user_id = ?",
                [userId],
                function (err, rows) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    incrementVisits(repoId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "UPDATE repository SET visits = visits + 1 WHERE id = ?",
                [repoId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = Repository;
