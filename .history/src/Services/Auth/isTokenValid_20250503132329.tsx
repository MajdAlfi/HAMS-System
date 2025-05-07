import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp?: number;
  // Add other fields if needed
};

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode(token);

    if (!decoded.exp) {
      // Token doesn't have an expiration – treat as invalid
      return false;
    }

    return Date.now() < decoded.exp * 1000;
  } catch (e) {
    // Malformed token
    return false;
  }
};
