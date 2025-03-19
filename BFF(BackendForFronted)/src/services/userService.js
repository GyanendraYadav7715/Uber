const axios = require("axios");

const BASE_BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

exports.registerUser = async (req, res) => {
    try {
        const response = await axios.post(`${BASE_BACKEND_URL}/users/register`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || "Something went wrong.",
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const response = await axios.post(`${BASE_BACKEND_URL}/users/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || "Invalid credentials.",
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const response = await axios.get(`${BASE_BACKEND_URL}/users/profile`, {
            headers: { Authorization: token },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Unauthorized access.",
        });
    }
};
