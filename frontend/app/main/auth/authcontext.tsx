"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import axios from "axios";
import { api, api_login, api_refresh, api_logout } from "@/constants/strings";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(api_refresh, {}, {
        withCredentials: true,
      });

      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("access_token", token);
      }
      setAccessToken(token);

      return token;
    } catch (error) {
      setAccessToken(null);
      setUser(null);

      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        setAccessToken(storedToken);
      }     
      await refreshAccessToken();
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const res = await axios.post(api_login, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      });

      const token = res.data.data.access_token;
      if (token) {
        localStorage.setItem("access_token", token);
      }
      setAccessToken(token);
      setUser({
        username: res.data.data.username,
      });
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(api_logout, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
    } catch {
      // lanjut clear state meski request gagal
    }
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken,
        loading,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}