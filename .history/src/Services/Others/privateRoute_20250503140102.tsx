import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../Auth/isTokenValid";
import { jwtDecode } from "jwt-decode";
type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return token && isTokenValid() === true ? children : <Navigate to="/login" />;
};
