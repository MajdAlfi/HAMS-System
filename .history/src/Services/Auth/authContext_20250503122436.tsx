// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode"; // Use CommonJS import

interface AuthContextType {
  user: any | null; // Decoded user information (adjust this based on your token structure)
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode.default(token); // Access the default export
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
    const decoded = jwt_decode.default(token);
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
