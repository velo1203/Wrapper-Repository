class Chapter {
    constructor(db) {
        this.db = db;
    }

    getAllChapters(courseId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                "SELECT * FROM Chapters WHERE CourseID = ? ORDER BY ChapterOrder",
                [courseId],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    deleteChapter(chapterId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "DELETE FROM Chapters WHERE ChapterID = ?",
                [chapterId],
                function (err) {
                    if (err) reject(err);
                    else resolve({ message: "Chapter deleted successfully" });
                }
            );
        });
    }

    getChapter(chapterId) {
        return new Promise((resolve, reject) => {
            this.db.get(
                "SELECT * FROM Chapters WHERE ChapterID = ?",
                [chapterId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    }

    updateChapter(chapterId, title, order) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "UPDATE Chapters SET Title = ?, ChapterOrder = ? WHERE ChapterID = ?",
                [title, order, chapterId],
                function (err) {
                    if (err) reject(err);
                    else resolve({ chapterId, title, order });
                }
            );
        });
    }

    createChapter(courseId, title) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO Chapters (CourseID, Title, ChapterOrder) SELECT ?, ?, IFNULL(MAX(ChapterOrder), 0) + 1 FROM Chapters WHERE CourseID = ?",
                [courseId, title, courseId],
                function (err) {
                    if (err) reject(err);
                    else resolve({ chapterId: this.lastID, courseId, title });
                }
            );
        });
    }
}

module.exports = Chapter;
