import axiosInstance from "../utils/helpers/axiosInstance.ts";
import { errorHandler } from "../utils/helpers/axiosErrorHandler.ts";

export const useAuthService = () => {
  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/auth/login/", credentials);
      return response.data;
    } catch (error: unknown) {
      return errorHandler(error);
    }
  };

  const register = async (credentials: {
    username: string;
    password: string;
    email?: string;
  }) => {
    try {
      const response = await axiosInstance.post("/auth/register/", credentials);
      return response.data;
    } catch (error: unknown) {
      return errorHandler(error);
    }
  };

  const refresh = async (refreshToken: string) => {
    const response = await axiosInstance.post("/auth/refresh/", {
      refresh: refreshToken,
    });
    return response.data;
  };

  return {
    login,
    register,
    refresh,
  };
};
