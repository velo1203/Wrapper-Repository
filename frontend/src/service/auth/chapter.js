import getApiClient from "../api";

const getChapterList = async (courseId) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.get(`/api/chapter/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("GET Request Error:", error);
        throw error;
    }
};

const createChapter = async (courseId, title) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.post(`/api/chapter/${courseId}`, {
            title,
        });
        return response.data;
    } catch (error) {
        console.error("POST Request Error:", error);
        throw error;
    }
};

const deleteChapter = async (chapterId) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.delete(`/api/chapter/${chapterId}`);
        return response.data;
    } catch (error) {
        console.error("DELETE Request Error:", error);
        throw error;
    }
};

const updateChapter = async (chapterId, chapters) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.put(
            `/api/chapter/${chapterId}`,
            chapters
        );
        return response.data;
    } catch (error) {
        console.error("PUT Request Error:", error);
        throw error;
    }
};

export { getChapterList, createChapter, deleteChapter, updateChapter };
