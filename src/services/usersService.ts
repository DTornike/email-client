import axiosInstance from "../utils/helpers/axiosInstance.ts";
import { errorHandler } from "../utils/helpers/axiosErrorHandler.ts";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../utils/store/userSlice.ts";

export const useUsersService = () => {
  const dispatch = useDispatch();

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
      if (response.data) {
        dispatch(
          setCurrentUser({
            username: response.data.username,
            email: response.data.email,
          }),
        );
      }
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
