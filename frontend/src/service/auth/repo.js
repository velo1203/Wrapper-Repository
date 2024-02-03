// service.js

import getApiClient from "../api";

const createRepo = async (name, description, zipfile) => {
    try {
        const apiClient = getApiClient();
        const formData = new FormData(); // FormData 객체 생성
        formData.append("name", name);
        formData.append("description", description);
        formData.append("zipfile", zipfile); // 파일 추가

        const response = await apiClient.post("/api/repository", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // 요청 헤더 설정
            },
        });
        return response.data;
    } catch (error) {
        console.error("POST Request Error:", error);
        throw error;
    }
};

const getRepoList = async () => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.get("/api/repository");
        return response.data;
    } catch (error) {
        console.error("GET Request Error:", error);
        throw error;
    }
};

export { createRepo, getRepoList };
