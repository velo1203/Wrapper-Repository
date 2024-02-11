// database/db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("internal/database/database.db"); // 데이터베이스 파일 생성 및 연결

db.serialize(() => {
    // 사용자 테이블 생성
    db.run(
        `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE,username TEXT, password TEXT,role TEXT)`
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS Courses (
            CourseID INTEGER PRIMARY KEY AUTOINCREMENT,
            ImagePath TEXT,
            Title TEXT NOT NULL,
            Description TEXT NOT NULL
        )`
    );
    db.run(`
    CREATE TABLE IF NOT EXISTS Chapters (
        ChapterID INTEGER PRIMARY KEY AUTOINCREMENT,
        CourseID INTEGER NOT NULL,
        Title TEXT NOT NULL,
        ChapterOrder INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE
    )`);
    db.run(`
    CREATE TABLE IF NOT EXISTS Lectures (
        LectureID INTEGER PRIMARY KEY AUTOINCREMENT,
        ChapterID INTEGER NOT NULL,
        Title TEXT NOT NULL,
        LectureOrder INTEGER NOT NULL,
        Content TEXT,
        MarkdownPath TEXT,  
        FOREIGN KEY (ChapterID) REFERENCES Chapters(ChapterID) ON DELETE CASCADE
    )`);
    db.run(`
    CREATE TABLE IF NOT EXISTS CourseContributors (
        CourseID INTEGER,
        UserID INTEGER,
        PRIMARY KEY (CourseID, UserID),
        FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE,
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
    )`);
    db.run(`
    CREATE TABLE IF NOT EXISTS repository (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        user_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        visits INTEGER DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id),
        UNIQUE(user_id, name)
    )
`);
});

module.exports = db;
