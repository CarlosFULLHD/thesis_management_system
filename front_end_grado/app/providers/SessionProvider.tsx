"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

// Defining the types for the context
interface SessionContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  sessionExpired: boolean;
}

// Creating the context with default values
const SessionContext = createContext<SessionContextType | null>(null);

// Defining the props for the provider component
interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  //For using the localStorage just in the browser, not in the server
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handleTokenExpiration = () => {
      if (token) {
        const decoded: { exp: number } = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          localStorage.removeItem("token");
          setToken(null);
          setSessionExpired(true);
          alert("Sesión terminada, debes volver a iniciar sesión");
        }
      }
    };

    if (token) {
      const decoded: { exp: number } = jwtDecode(token);
      const expirationTime = (decoded.exp - Date.now() / 1000) * 1000;
      const timeout = setTimeout(handleTokenExpiration, expirationTime);
      return () => clearTimeout(timeout);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setSessionExpired(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setSessionExpired(false);
  };

  return (
    <SessionContext.Provider value={{ token, login, logout, sessionExpired }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
