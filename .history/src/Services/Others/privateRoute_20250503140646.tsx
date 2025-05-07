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
export const PrivateRoute = ({ children, accountType }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode<MyTokenPayload>(token);
      if (decoded.accountType == accountTypeReq) {
        return token && isTokenValid() === true ? (
          children
        ) : (
          <Navigate to="/login" />
        );
      } else {
        alert("sorry this page is unavialable for your account type");
      }
      console.log(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
};
