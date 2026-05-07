"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import axios from "axios";
import { api, api_refresh } from "@/constans/strings";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_LOGIN = "http://localhost:8080/api/auth/login";
const API_REFRESH = "http://localhost:8080/api/auth/refresh";

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
      const res = await axios.get(api_refresh, {
        withCredentials: true,
      });

      const token = res.data.access_token;

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
      await refreshAccessToken();
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (
    username: string,
    password: string
  ) => {
    const res = await axios.post(
      API_LOGIN,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );

    const token = res.data.data.access_token;

    setAccessToken(token);

    setUser({
      username: res.data.data.username,
    });
  };

  const logout = () => {
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