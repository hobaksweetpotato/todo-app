import axiosInstance from "./axiosInstance";

export const signup = async (userData) => {
    const response = await axiosInstance.post("/api/members/register", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axiosInstance.post("/api/members/login", userData);
    return response.data;
};