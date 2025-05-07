import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../Auth/isTokenValid";
import { jwt_decode, JwtPayload } from "jwt-decode";
type PrivateRouteProps = {
  children: ReactNode;
};
interface MyTokenPayload extends JwtPayload {
  name: string;
  email: string;
  role: string;
}
export const PrivateRoute = (
  { children }: PrivateRouteProps,
  accountTypeReq: string
) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwt_decode<MyTokenPayload>(token);
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
