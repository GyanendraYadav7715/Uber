import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BFF_URL || "http://localhost:4000";

export const registerUser = async (userData) => {
    return axios.post(`${API_BASE_URL}/users/register`, userData);
};

export const loginUser = async (credentials) => {
    return axios.post(`${API_BASE_URL}/users/login`, credentials);
};

export const getUserProfile = async (token) => {
    return axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: token },
    });
};
