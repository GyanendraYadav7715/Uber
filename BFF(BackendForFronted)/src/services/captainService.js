const axios = require("axios");

const BASE_BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

exports.registerCaptain = async (req, res) => {
    try {
        const response = await axios.post(`${BASE_BACKEND_URL}/captain/register`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || "Something went wrong.",
        });
    }
};

exports.loginCaptain = async (req, res) => {
    try {
        const response = await axios.post(`${BASE_BACKEND_URL}/captain/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || "Invalid credentials.",
        });
    }
};

exports.getCaptainrProfile = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const response = await axios.get(`${BASE_BACKEND_URL}/captain/profile`, {
            headers: { Authorization: token },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Unauthorized access.",
        });
    }
};
