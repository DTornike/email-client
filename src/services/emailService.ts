import axiosInstance from "../utils/helpers/axiosInstance";
import { errorHandler } from "../utils/helpers/axiosErrorHandler";
import { Email, EmailResponse } from "../models";

export const useEmailService = () => {
  const sendEmail = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post<Email>("/emails/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: unknown) {
      return errorHandler(error);
    }
  };

  const getSentEmails = async () => {
    try {
      const response = await axiosInstance.get<EmailResponse[]>("/emails/sent");
      return { data: response.data };
    } catch (error: unknown) {
      return errorHandler<EmailResponse[]>(error);
    }
  };

  const getReceivedEmails = async () => {
    try {
      const response =
        await axiosInstance.get<EmailResponse[]>("/emails/received");
      return { data: response.data };
    } catch (error: unknown) {
      return errorHandler<EmailResponse[]>(error);
    }
  };

  const markAsRead = async (emailId: number) => {
    try {
      const response = await axiosInstance.patch<Email>(
        `/emails/${emailId}/read`,
        {
          is_read: true,
        },
      );
      return { data: response.data };
    } catch (error: unknown) {
      return errorHandler<Email>(error);
    }
  };

  return {
    sendEmail,
    getSentEmails,
    getReceivedEmails,
    markAsRead,
  };
};

export default useEmailService;
