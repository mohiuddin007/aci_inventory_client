"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";

interface User {
  username: string;
  role: string;
  exp: number; 
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["auth-token"];

    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();

        if (expiryTime < currentTime) {
          console.warn("Token expired. Logging out...");
          logout(); 
        } else {
          setUser(decoded);
          setTimeout(logout, expiryTime - currentTime); 
        }
      } catch (error) {
        console.error("Invalid token:", error);
        destroyCookie(null, "auth-token");
      }
    }
  }, []);

  const login = (token: string) => {
    document.cookie = `auth-token=${token}; path=/; max-age=${
      7 * 24 * 60 * 60
    }; secure; samesite=strict`;

    const decoded = jwtDecode<User>(token);
    setUser(decoded);

    router.push("/");
  };

  const logout = () => {
    destroyCookie(null, "auth-token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
