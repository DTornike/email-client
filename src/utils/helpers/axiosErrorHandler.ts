import { isAxiosError } from "axios";

type ErrorResponse<T> = {
  data?: T;
  error: string;
  fieldErrors?: Record<string, string>;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

export const errorHandler = <T>(error: unknown): ErrorResponse<T> => {
  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 401) {
        logout();
        return { error: "Unauthorized. You have been logged out." };
      }

      if (error.response.data) {
        const data = error.response.data;

        if (typeof data === "object") {
          const fieldErrors = Object.entries(data).reduce(
            (acc, [field, messages]) => {
              if (Array.isArray(messages)) {
                acc[field] = messages.join(" ");
              }
              return acc;
            },
            {} as Record<string, string>,
          );

          if (Object.keys(fieldErrors).length > 0) {
            const formattedErrors = Object.entries(fieldErrors)
              .map(([field, message]) => `${field}: ${message}`)
              .join(", ");

            return { error: formattedErrors };
          }
        }

        if (data.detail) {
          return { error: data.detail };
        }
      }
    }

    return { error: "Something went wrong. Please try again." };
  }

  return { error: "An unexpected error occurred." };
};
