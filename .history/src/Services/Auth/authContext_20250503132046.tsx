// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { JwtPayload } from "jwt-decode"; // Correct import for default export
import jwt_decode from "jwt-decode";
interface AuthContextType {
  user: JwtPayload | null; // Decoded user information
  login: (token: string) => void;
  logout: () => void;
}

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: Props) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode<JwtPayload>(token); // Decode the token
        setUser(decoded);
      } catch (e) {
        console.warn("Invalid token", e);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwt_decode<JwtPayload>(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
