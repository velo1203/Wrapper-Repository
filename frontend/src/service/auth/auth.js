// service.js

import getApiClient from "../api";

// GET 요청
const login = async (email, password) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.post("api/login", {
            email: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.error("GET Request Error:", error);
        throw error;
    }
};

const getuser = async (id) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.get(`api/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("GET Request Error:", error);
        throw error;
    }
};

const register = async (email, password, userName) => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.post("api/register", {
            email: email,
            password: password,
            username: userName,
        });
        return response.data;
    } catch (error) {
        console.error("GET Request Error:", error);

        throw error;
    }
};

const authenticateAdmin = async () => {
    try {
        const apiClient = getApiClient();
        const response = await apiClient.get("api/admin/check");
        return response.data;
    } catch (error) {
        console.error("GET Request Error:", error);
        throw error;
    }
};

export { login, register, authenticateAdmin, getuser };
