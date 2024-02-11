const Chapter = require("../models/chapter");
const db = require("../database/db");
const chapter = new Chapter(db);

exports.createChapter = async (courseId, title) => {
    try {
        const chapterId = await chapter.createChapter(courseId, title);
        return { chapterId };
    } catch (err) {
        throw err;
    }
};

exports.deleteChapter = async (id) => {
    try {
        await chapter.deleteChapter(id);
        return { message: "Chapter deleted successfully" };
    } catch (err) {
        throw err;
    }
};

exports.updateChapter = async (chapters) => {
    try {
        chapters.map(async (chapter) => {
            // 배열의 각 요소에 대해 비동기 작업을 수행
            await chapter.updateChapter(
                chapter.id,
                chapter.title,
                chapter.order
            );
        });
        return { message: "Chapter updated successfully" };
    } catch (err) {
        throw err;
    }
};

exports.findChapterById = async (id) => {
    try {
        const chapterFound = await chapter.getChapter(id);
        return chapterFound;
    } catch (err) {
        throw err;
    }
};

exports.findAllChapters = async (courseId) => {
    try {
        const chapters = await chapter.getAllChapters(courseId);
        return { chapters };
    } catch (err) {
        throw err;
    }
};
