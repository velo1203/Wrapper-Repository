import getApiClient from "../api";

const getCourseList = async () => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.get("/api/course");
        return response.data;
    } catch (error) {
        console.error("GET Request Error:", error);
        throw error;
    }
};

const createCourse = async (title, description, imageFile) => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", imageFile); // 'image'는 서버에서 해당 파일을 참조하는 필드의 이름이어야 합니다.

        const apiClient = getApiClient();
        const response = await apiClient.post("/api/course", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // FormData와 함께 요청할 때는 콘텐츠 타입을 명시적으로 설정해야 합니다.
            },
        });
        return response.data;
    } catch (error) {
        console.error("POST Request Error with Image:", error);
        throw error;
    }
};

const deleteCourse = async (courseId) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.delete(`/api/course/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("DELETE Request Error:", error);
        throw error;
    }
};

export { getCourseList, createCourse, deleteCourse };
