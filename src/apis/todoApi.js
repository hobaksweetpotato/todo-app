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

export const updateTodo = async (memberId, todoId, todoData) => {
  const response = await axiosInstance.patch(
    `/api/members/${memberId}/todos/${todoId}`,
    todoData
  );

  return response.data;
};

export const deleteTodo = async (memberId, todoId) => {
  const response = await axiosInstance.delete(
    `/api/members/${memberId}/todos/${todoId}`
  );

  return response.data;
};

export const toggleTodoCheck = async (memberId, todoId) => {
  const response = await axiosInstance.patch(
    `/api/members/${memberId}/todos/${todoId}/check`
  );

  return response.data;
};

export const updateTodoReview = async (memberId, todoId, reviewData) => {
  const response = await axiosInstance.patch(
    `/api/members/${memberId}/todos/${todoId}/reviews`,
    reviewData
  );

  return response.data;
};