class Course {
    constructor(db) {
        this.db = db;
    }

    createCourse(title, description) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO Courses (Title, Description) VALUES (?, ?)",
                [title, description],
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

    setCourseImagePath(id, imagePath) {
        // 이미지 경로를 저장하는 메소드
        return new Promise((resolve, reject) => {
            this.db.run(
                "UPDATE Courses SET ImagePath = ? WHERE CourseID = ?",
                [imagePath, id],
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

    updateCourse(id, title, description) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "UPDATE Courses SET Title = ?, Description = ? WHERE CourseID = ?",
                [title, description, id],
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

    deleteCourse(id) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "DELETE FROM Courses WHERE CourseID = ?",
                [id],
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

    findCourseById(id) {
        return new Promise((resolve, reject) => {
            this.db.get(
                "SELECT * FROM Courses WHERE CourseID = ?",
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

    findAllCourses() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM Courses", function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = Course;
