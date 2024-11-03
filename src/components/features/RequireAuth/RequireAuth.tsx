import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type RequireAuthTypes = {
  children: ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthTypes) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};
