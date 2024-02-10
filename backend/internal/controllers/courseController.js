const Course = require("../models/course");
const db = require("../database/db");
const course = new Course(db);

// 코스 생성
exports.createCourse = async (title, description, imagePath) => {
    try {
        imagePath = imagePath.replace(/public\\/, ""); // 이미지 경로에서 public 문자열 제거
        imagePath = imagePath.replace(/\\/g, "/"); // 이미지 경로에서 역슬래시 문자를 슬래시 문자로 변경
        console.log(imagePath);
        const courseId = await course.createCourse(
            title,
            description,
            imagePath
        );
        return { courseId };
    } catch (err) {
        throw err;
    }
};

// 코스 삭제
exports.deleteCourse = async (id) => {
    try {
        await course.deleteCourse(id);
        return { message: "Course deleted successfully" };
    } catch (err) {
        throw err;
    }
};

// 모든 코스 조회
exports.findAllCourses = async () => {
    try {
        const courses = await course.findAllCourses();
        return { courses };
    } catch (err) {
        throw err;
    }
};
