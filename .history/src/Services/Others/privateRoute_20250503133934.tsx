import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../Auth/isTokenValid";
type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  return token && isTokenValid() === true ? children : <Navigate to="/login" />;
};
