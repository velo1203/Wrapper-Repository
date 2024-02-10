class Course {
    constructor(db) {
        this.db = db;
    }

    createCourse(title, description, courseImagePath) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO Courses (Title, Description,ImagePath) VALUES (?, ?,?)",
                [title, description, courseImagePath],
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
