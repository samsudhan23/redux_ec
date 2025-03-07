
import axios from "axios";
import config from "../../config";

export const login = async (data) => {
    try {
        const response = await axios.post(`${config.API_URL}auth/login`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Login failed" };
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post(`${config.API_URL}auth/register`, data);
        return response.data;
     }
    catch (error) {
        throw error.response?.data || { message: "Registration failed" };
    }
}