import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../Auth/isTokenValid";
import { jwtDecode, JwtPayload } from "jwt-decode";

type PrivateRouteProps = {
  children: ReactNode;
  accountTypeReq: string;
};

interface MyTokenPayload extends JwtPayload {
  user_id: string;
  phoneNo: number;
  accountType: string;
}

export const PrivateRoute = ({
  children,
  accountTypeReq,
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode<MyTokenPayload>(token);

      if (decoded.accountType === accountTypeReq) {
        return isTokenValid() ? children : <Navigate to="/login" />;
      } else {
        alert("sorry this page is unavailable for your account type");
        return <Navigate to="/login" />;
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
      return <Navigate to="/login" />;
    }
  }

  // Fallback when no token exists
  return <Navigate to="/login" />;
};
