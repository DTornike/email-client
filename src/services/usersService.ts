import axiosInstance from "../utils/helpers/axiosInstance.ts";
import { errorHandler } from "../utils/helpers/axiosErrorHandler.ts";

export const useUsersService = () => {
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/list/");
      return response.data?.results;
    } catch (error: unknown) {
      return errorHandler(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/users/current-user/");
      return response.data;
    } catch (error: unknown) {
      return errorHandler(error);
    }
  };

  return {
    fetchUsers,
    getCurrentUser,
  };
};
