//SessionProvider.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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
  authorities: string;
  userId: number;
}
interface DecodedToken {
  authorities: string;
  role: string;
  userId: number;
  name: string;
  exp: number;
}

// Creating the context with default values
const SessionContext = createContext<SessionContextType | null>(null);

// Defining the props for the provider component
interface SessionProviderProps {
  children: ReactNode;
}
function validateToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      setSessionExpired(true);
      return null;
    }
    return token;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null);

  const [sessionExpired, setSessionExpired] = useState(false);
  //For using the localStorage just in the browser, not in the server
  const [token, setToken] = useState<string | null>(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return validateToken(storedToken);
  });

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserDetails({
        name: decoded.name,
        role: decoded.role,
        authorities: decoded.authorities,
        userId: decoded.userId,
      });
    } else {
      setUserDetails(null);
    }
  }, [token]);

  useEffect(() => {
    if (userDetails && token) {
      const decoded: DecodedToken = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        logout();
      } else {
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

  const login = useCallback((newToken: string) => {
    const validToken = validateToken(newToken);
    if (validToken) {
      localStorage.setItem("token", validToken);
      setToken(validToken);
      setSessionExpired(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setSessionExpired(true);
  }, []);

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
function setSessionExpired(arg0: boolean) {
  throw new Error("Function not implemented.");
}
