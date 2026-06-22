import axiosInstance from "./axiosInstance";

export const getTodos = async (memberId) => {
  const response = await axiosInstance.get(`/api/members/${memberId}/todos`);
  return response.data;
};

export const createTodo = async (memberId, todoData) => {
  const response = await axiosInstance.post(
    `/api/members/${memberId}/todos`,
    todoData
  );

  return response.data;
};