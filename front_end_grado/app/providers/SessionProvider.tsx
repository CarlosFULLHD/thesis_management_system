//SessionProvider.tsx
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
  userDetails: UserDetail | null;
}

interface UserDetail {
  name: string;
  role: string;
  userId: number;
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
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null);

  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded: {
        role: string;
        userId: number;
        name: string;
        exp: number;
      } = jwtDecode(token);
      setUserDetails({
        name: decoded.name,
        role: decoded.role,
        userId: decoded.userId,
      });
    } else {
      setUserDetails(null);
    }
  }, [token]);

  useEffect(() => {
    if (userDetails && token) {
      const decoded: {
        role: string;
        userId: number;
        name: string;
        exp: number;
      } = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        logout();
      } else {
        // Set a timeout to automatically logout when token expires
        const timeout = setTimeout(
          () => {
            logout();
          },
          (decoded.exp - now) * 1000
        );
        return () => clearTimeout(timeout);
      }
    }
  }, [userDetails, token]);

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
    <SessionContext.Provider
      value={{ token, userDetails, login, logout, sessionExpired }}
    >
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
